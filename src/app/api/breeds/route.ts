import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

// GET /api/breeds - Get all breeds with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters for filtering
    const search = searchParams.get("search");
    const group = searchParams.get("group");
    const size = searchParams.get("size");
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Build where clause
    const where: Record<string, unknown> = {};
    
    if (search) {
      where.OR = [
        { breed: { contains: search, mode: "insensitive" } },
        { temperament: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    
    if (group) {
      where.group = { equals: group };
    }

    // Size filtering based on weight ranges
    if (size) {
      switch (size) {
        case "small":
          where.max_weight = { lte: 10 };
          break;
        case "medium":
          where.min_weight = { gte: 10 };
          where.max_weight = { lte: 25 };
          break;
        case "large":
          where.min_weight = { gte: 25 };
          where.max_weight = { lte: 45 };
          break;
        case "giant":
          where.min_weight = { gte: 45 };
          break;
      }
    }

    const [breeds, total] = await Promise.all([
      db.breed.findMany({
        where,
        orderBy: { breed: "asc" },
        take: limit,
        skip: offset,
      }),
      db.breed.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: breeds,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + breeds.length < total,
      },
    });
  } catch (error) {
    console.error("API Error - GET /api/breeds:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch breeds" },
      { status: 500 }
    );
  }
}
