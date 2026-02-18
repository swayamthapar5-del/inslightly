import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard", "/survey", "/wallet", "/rewards", "/notifications", "/company", "/admin"];
const PUBLIC_AUTH_PAGES = ["/login"];
const ACCESS_TOKEN_COOKIE = "insightexchange_access_token";

type TokenPayload = {
  role?: string;
};

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function isPublicAuthPath(pathname: string) {
  return PUBLIC_AUTH_PAGES.some((page) => pathname === page || pathname.startsWith(`${page}/`));
}

function parseTokenPayload(token: string | undefined): TokenPayload | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;

  try {
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payload.padEnd(Math.ceil(payload.length / 4) * 4, "=");
    const decoded = atob(padded);
    return JSON.parse(decoded) as TokenPayload;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const hasToken = Boolean(token);
  const payload = parseTokenPayload(token);
  const role = payload?.role;

  if (isProtectedPath(pathname) && !hasToken) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (pathname === "/company" || pathname.startsWith("/company/")) {
    if (role !== "COMPANY" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (isPublicAuthPath(pathname) && hasToken) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/survey/:path*", "/wallet/:path*", "/rewards/:path*", "/notifications/:path*", "/company/:path*", "/admin/:path*", "/login"]
};
