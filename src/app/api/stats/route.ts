import { NextResponse } from "next/server";
import { db } from "@/server/db";

// GET /api/stats - Get breed statistics
export async function GET() {
  try {
    const [
      totalBreeds,
      groupCounts,
      averageLifespan,
      sizeDistribution,
    ] = await Promise.all([
      // Total breeds count
      db.breed.count(),
      
      // Count by group
      db.breed.groupBy({
        by: ["group"],
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
      }),
      
      // Average lifespan calculation
      db.breed.aggregate({
        _avg: {
          min_expectancy: true,
          max_expectancy: true,
        },
      }),
      
      // Size distribution based on weight
      db.$queryRaw`
        SELECT 
          CASE 
            WHEN max_weight <= 10 THEN 'small'
            WHEN max_weight <= 25 THEN 'medium'
            WHEN max_weight <= 45 THEN 'large'
            ELSE 'giant'
          END as size_category,
          COUNT(*) as count
        FROM "Breed"
        WHERE max_weight IS NOT NULL
        GROUP BY size_category
        ORDER BY count DESC
      ` as Promise<{ size_category: string; count: bigint }[]>,
    ]);

    const avgMinLife = averageLifespan._avg.min_expectancy || 0;
    const avgMaxLife = averageLifespan._avg.max_expectancy || 0;
    const avgLifespan = ((avgMinLife + avgMaxLife) / 2).toFixed(1);

    return NextResponse.json({
      success: true,
      data: {
        totalBreeds,
        averageLifespan: parseFloat(avgLifespan),
        groupDistribution: groupCounts.map((g) => ({
          group: g.group || "Unknown",
          count: g._count.id,
        })),
        sizeDistribution: sizeDistribution.map((s) => ({
          size: s.size_category,
          count: Number(s.count),
        })),
      },
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("API Error - GET /api/stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
