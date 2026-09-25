import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "ar"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = locales.find(
    (value) => pathname === `/${value}` || pathname.startsWith(`/${value}/`),
  );

  if (locale) {
    const headers = new Headers(request.headers);
    headers.set("x-locale", locale);
    return NextResponse.next({ request: { headers } });
  }

  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api).*)"],
};
