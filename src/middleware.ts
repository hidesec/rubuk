import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const origin = request.headers.get("origin");
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL || "",
    "http://localhost:3000",
    "http://localhost:3001",
  ].filter(Boolean);

  const isAllowedOrigin = allowedOrigins.length === 0 || !origin || allowedOrigins.includes(origin);

  if (request.method === "OPTIONS") {
    const preflight = new NextResponse(null, { status: 204 });
    if (isAllowedOrigin) {
      preflight.headers.set("Access-Control-Allow-Origin", origin || "*");
    }
    preflight.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    preflight.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    preflight.headers.set("Access-Control-Max-Age", "86400");
    return preflight;
  }

  const response = NextResponse.next();
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin || "*");
  }
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

export const config = {
  matcher: "/api/:path*",
};
