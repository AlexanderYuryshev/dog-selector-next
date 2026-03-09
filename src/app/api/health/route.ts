import { NextResponse } from "next/server";
import { db } from "@/server/db";

// GET /api/health - Health check endpoint
export async function GET() {
  const startTime = Date.now();
  
  try {
    // Check database connection
    await db.$queryRaw`SELECT 1`;
    const dbLatency = Date.now() - startTime;

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV,
      checks: {
        database: {
          status: "connected",
          latency: `${dbLatency}ms`,
        },
      },
      uptime: process.uptime(),
    });
  } catch (error) {
    console.error("Health check failed:", error);
    
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        checks: {
          database: {
            status: "disconnected",
            error: "Failed to connect to database",
          },
        },
      },
      { status: 503 }
    );
  }
}
