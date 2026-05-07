import { NextRequest, NextResponse } from "next/server";

const IS_MAINTENANCE = process.env.MAINTENANCE_MODE === "true";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow the maintenance page itself through
  if (pathname.startsWith("/maintenance")) {
    return NextResponse.next();
  }

  if (IS_MAINTENANCE) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder assets (images, svg, lottie, brands, testimonial)
     */
    "/((?!_next/static|_next/image|favicon.ico|assets|images|svg|lottie|brands|testimonial).*)",
  ],
};
