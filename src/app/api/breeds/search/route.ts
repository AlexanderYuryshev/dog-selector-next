import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

// GET /api/breeds/search - Advanced search with multiple criteria
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const query = searchParams.get("q") || "";
    const goodWithChildren = searchParams.get("children") === "true";
    const goodWithDogs = searchParams.get("dogs") === "true";
    const minEnergy = parseInt(searchParams.get("minEnergy") || "0");
    const maxEnergy = parseInt(searchParams.get("maxEnergy") || "5");
    const trainability = parseInt(searchParams.get("trainability") || "0");

    const where: Record<string, unknown> = {};
    const andConditions: Record<string, unknown>[] = [];

    // Text search
    if (query) {
      andConditions.push({
        OR: [
          { breed: { contains: query, mode: "insensitive" } },
          { temperament: { contains: query, mode: "insensitive" } },
          { group: { contains: query, mode: "insensitive" } },
        ],
      });
    }

    // Suitability filters
    if (goodWithChildren) {
      andConditions.push({ children_suitability: { gte: 4 } });
    }
    
    if (goodWithDogs) {
      andConditions.push({ good_with_other_dogs: { gte: 4 } });
    }

    // Energy level range
    if (minEnergy > 0 || maxEnergy < 5) {
      andConditions.push({
        energy_level_value: { gte: minEnergy, lte: maxEnergy },
      });
    }

    // Trainability threshold
    if (trainability > 0) {
      andConditions.push({ trainability_value: { gte: trainability } });
    }

    if (andConditions.length > 0) {
      where.AND = andConditions;
    }

    const breeds = await db.breed.findMany({
      where,
      orderBy: { breed: "asc" },
      take: 50,
    });

    return NextResponse.json({
      success: true,
      data: breeds,
      meta: {
        query,
        filters: {
          goodWithChildren,
          goodWithDogs,
          energyRange: [minEnergy, maxEnergy],
          trainability,
        },
        resultCount: breeds.length,
      },
    });
  } catch (error) {
    console.error("API Error - GET /api/breeds/search:", error);
    return NextResponse.json(
      { success: false, error: "Search failed" },
      { status: 500 }
    );
  }
}
