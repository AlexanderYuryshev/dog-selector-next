import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

// GET /api/breeds/random - Get random breed(s)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const count = Math.min(parseInt(searchParams.get("count") || "1"), 10);

    // Get total count for random offset
    const total = await db.breed.count();
    
    if (total === 0) {
      return NextResponse.json(
        { success: false, error: "No breeds available" },
        { status: 404 }
      );
    }

    // Get random breeds using raw query for true randomness
    const randomBreeds = await db.$queryRaw`
      SELECT * FROM "Breed" 
      ORDER BY RANDOM() 
      LIMIT ${count}
    `;

    return NextResponse.json({
      success: true,
      data: count === 1 ? (randomBreeds as unknown[])[0] : randomBreeds,
      meta: {
        requestedCount: count,
        totalAvailable: total,
      },
    });
  } catch (error) {
    console.error("API Error - GET /api/breeds/random:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch random breed" },
      { status: 500 }
    );
  }
}
