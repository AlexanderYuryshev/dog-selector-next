import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/breeds/[id] - Get a specific breed by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const breedId = parseInt(id);

    if (isNaN(breedId)) {
      return NextResponse.json(
        { success: false, error: "Invalid breed ID" },
        { status: 400 }
      );
    }

    const breed = await db.breed.findFirst({
      where: { id: breedId },
    });

    if (!breed) {
      return NextResponse.json(
        { success: false, error: "Breed not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: breed,
    });
  } catch (error) {
    console.error("API Error - GET /api/breeds/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch breed" },
      { status: 500 }
    );
  }
}
