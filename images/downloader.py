import aiohttp
import asyncio

HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}


async def download_image(session, url, path):
    async with session.get(url, headers=HEADERS, timeout=20) as resp:
        if resp.status == 200:
            with open(path, "wb") as f:
                f.write(await resp.read())


async def download_many(urls, paths):
    async with aiohttp.ClientSession() as session:
        tasks = [download_image(session, url, path) for url, path in zip(urls, paths)]
        await asyncio.gather(*tasks, return_exceptions=True)
