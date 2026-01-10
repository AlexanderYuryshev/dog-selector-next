import os
import shutil
import psycopg2

# ---------- НАСТРОЙКИ ----------
IMAGES_SRC_DIR = "images"
IMAGES_DST_DIR = "public/images"

DB_CONFIG = {
    "host": "localhost",
    "port": 5432,
    "dbname": "dog-breeds",
    "user": "postgres",
    "password": "123",
}
# --------------------------------
# "postgresql://postgres:123@localhost:5432/dog-breeds"

def normalize_breed_name(folder_name: str) -> str:
    """
    alaskan_malamute -> Alaskan Malamute
    """
    return folder_name.replace("_", " ").title()


def main():
    os.makedirs(IMAGES_DST_DIR, exist_ok=True)

    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()

    for breed_folder in os.listdir(IMAGES_SRC_DIR):
        breed_path = os.path.join(IMAGES_SRC_DIR, breed_folder)

        if not os.path.isdir(breed_path):
            continue

        # Ищем файл с индексом _0
        image_0 = None
        for file in os.listdir(breed_path):
            if file.startswith(f"{breed_folder}_0."):
                image_0 = file
                break

        if not image_0:
            print(f"⚠️ Нет файла *_0 для {breed_folder}")
            continue

        src_image_path = os.path.join(breed_path, image_0)

        ext = os.path.splitext(image_0)[1]
        new_filename = f"{breed_folder}{ext}"
        dst_image_path = os.path.join(IMAGES_DST_DIR, new_filename)

        shutil.copyfile(src_image_path, dst_image_path)

        image_url = f"/images/{new_filename}"
        breed_name_db = normalize_breed_name(breed_folder)

        cur.execute(
            """
            UPDATE breeds
            SET image = %s
            WHERE breed = %s
            """,
            (image_url, breed_name_db),
        )

        print(f"✅ {breed_name_db} → {image_url}")

    conn.commit()
    cur.close()
    conn.close()


if __name__ == "__main__":
    main()
