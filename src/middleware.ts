import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};
export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/people", request.url));
  }
  if (request.nextUrl.pathname === "/settings") {
    return NextResponse.rewrite(new URL("/settings/profile", request.url));
  }
}
