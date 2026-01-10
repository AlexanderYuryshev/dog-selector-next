import os
import asyncio
from urllib.parse import urlparse
from playwright.async_api import async_playwright

BASE_IMAGE_DIR = "images"
os.makedirs(BASE_IMAGE_DIR, exist_ok=True)

MIN_BYTES = 30_000

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/120.0.0.0 Safari/537.36"
)


async def scrape_images(breed: str, limit: int = 4):
    # нормализуем имя породы
    breed_dir_name = breed.strip().lower().replace(" ", "_")
    breed_dir = os.path.join(BASE_IMAGE_DIR, breed_dir_name)

    # 🔍 если папка уже есть — выходим
    if os.path.exists(breed_dir):
        print(f"⚠️ папка {breed_dir} уже существует, пропускаю")
        return []

    os.makedirs(breed_dir, exist_ok=True)

    saved = []
    counter = 0

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=False,
            slow_mo=50,
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox",
                "--start-maximized",
                "--disable-features=IsolateOrigins,site-per-process",
            ],
        )

        context = await browser.new_context(
            user_agent=USER_AGENT,
            viewport={"width": 1400, "height": 900},
        )

        await context.add_init_script("""
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined
            });
        """)

        page = await context.new_page()

        async def route_handler(route):
            nonlocal counter

            url = route.request.url

            if "duckduckgo.com/iu" not in url and "bing.net/th" not in url:
                await route.continue_()
                return

            if counter >= limit:
                await route.abort()
                return

            try:
                response = await route.fetch()
                body = await response.body()

                if not body or len(body) < MIN_BYTES:
                    await route.continue_()
                    return

                parsed = urlparse(url)
                ext = os.path.splitext(parsed.path)[1] or ".jpg"

                filename = f"{breed_dir_name}_{counter}{ext}"
                path = os.path.join(breed_dir, filename)

                with open(path, "wb") as f:
                    f.write(body)

                print(f"✅ saved {path}")
                saved.append(path)
                counter += 1

                await route.fulfill(
                    status=response.status,
                    headers=response.headers,
                    body=body,
                )

            except Exception as e:
                print("❌ image error:", e)
                await route.continue_()

        await page.route("**/*", route_handler)

        search_url = f"https://duckduckgo.com/?q={breed} dog breed&iax=images&ia=images"

        await page.goto(
            "https://duckduckgo.com/",
            wait_until="domcontentloaded",
            timeout=60_000,
        )

        await asyncio.sleep(2)

        await page.goto(
            search_url,
            wait_until="domcontentloaded",
            timeout=60_000,
        )

        for _ in range(8):
            await page.mouse.wheel(0, 2500)
            await asyncio.sleep(1.2)

            if counter >= limit:
                break

        print(f"🎯 collected {counter} images for {breed}")

        await asyncio.sleep(2)
        await browser.close()

    return saved
