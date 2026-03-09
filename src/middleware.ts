import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Configuration for middleware
export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};

// Simple in-memory rate limiting (for demonstration)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100;

function getRateLimitKey(request: NextRequest): string {
  // Use IP address or a fallback
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0] || "anonymous";
  return ip;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = requestCounts.get(key);

  if (!record || now > record.resetTime) {
    requestCounts.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count };
}

export function middleware(request: NextRequest) {
  const startTime = Date.now();
  const requestId = crypto.randomUUID();
  const pathname = request.nextUrl.pathname;
  const method = request.method;

  // Rate limiting for API routes
  if (pathname.startsWith("/api/")) {
    const rateLimitKey = getRateLimitKey(request);
    const { allowed, remaining } = checkRateLimit(rateLimitKey);

    if (!allowed) {
      console.log(`[MIDDLEWARE] Rate limit exceeded for ${rateLimitKey}`);
      return NextResponse.json(
        { 
          success: false, 
          error: "Too many requests. Please try again later.",
          retryAfter: 60 
        },
        { 
          status: 429,
          headers: {
            "Retry-After": "60",
            "X-RateLimit-Limit": MAX_REQUESTS_PER_WINDOW.toString(),
            "X-RateLimit-Remaining": "0",
          }
        }
      );
    }

    // Continue with enhanced headers for API routes
    const response = NextResponse.next();
    
    // Add rate limit headers
    response.headers.set("X-RateLimit-Limit", MAX_REQUESTS_PER_WINDOW.toString());
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    response.headers.set("X-Request-Id", requestId);
    
    // Calculate and log response time
    const duration = Date.now() - startTime;
    response.headers.set("X-Response-Time", `${duration}ms`);
    
    // Log API request
    console.log(`[API] ${method} ${pathname} - ${requestId} - ${duration}ms`);
    
    return response;
  }

  // For page routes, add security and performance headers
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  
  // Performance headers
  response.headers.set("X-Request-Id", requestId);
  const duration = Date.now() - startTime;
  response.headers.set("X-Response-Time", `${duration}ms`);
  
  // Locale handling - detect and redirect if needed
  const acceptLanguage = request.headers.get("accept-language");
  response.headers.set("Content-Language", "ru");
  
  // Log page request
  console.log(`[PAGE] ${method} ${pathname} - ${requestId} - ${duration}ms - Lang: ${acceptLanguage?.split(",")[0] || "unknown"}`);

  return response;
}
