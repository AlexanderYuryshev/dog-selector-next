import asyncio
import os

from db import SessionLocal
from models import Breed, BreedImage
from scraper import scrape_images

from PIL import Image

MIN_WIDTH = 400
MIN_HEIGHT = 400


def is_valid_image(path: str) -> bool:
    try:
        with Image.open(path) as img:
            w, h = img.size
            return w >= MIN_WIDTH and h >= MIN_HEIGHT
    except Exception:
        return False


async def main():
    db = SessionLocal()

    breeds = db.query(Breed).all()

    for breed in breeds:
        print(f"🐶 {breed.breed}")

        images = await scrape_images(
            breed=breed.breed,
            limit=4,
        )

        # for img in images:
        #     path = img["path"]

        #     if not os.path.exists(path):
        #         continue

        #     if not is_valid_image(path):
        #         os.remove(path)
        #         print("  ❌ удалено (мусор)")
        #         continue

        #     db.add(
        #         BreedImage(
        #             breed_id=breed.id,
        #             path=path,
        #             url=img["url"],
        #         )
        #     )
        #     db.commit()

        #     print(f"  ✅ сохранено: {path}")

    db.close()


if __name__ == "__main__":
    asyncio.run(main())
    # asyncio.run(scrape_images("affenpinscher", 5))
