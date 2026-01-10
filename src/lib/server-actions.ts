"use server";

import { db } from "@/server/db";

export async function getBreeds() {
  try {
    const breeds = await db.breed.findMany({
      orderBy: {
        breed: "asc",
      },
    });

    return breeds;
  } catch (error) {
    console.error("Error fetching breeds:", error);
    throw new Error("Failed to fetch breeds");
  }
}

export async function getBreedById(id: number) {
  try {
    const breed = await db.breed.findFirst({
      where: {
        id: { equals: id },
      },
    });

    return breed;
  } catch (error) {
    console.error("Error fetching breeds:", error);
    throw new Error("Failed to fetch breeds");
  }
}
