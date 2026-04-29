import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    // Redirect / to /dashboard if logged in, or /login if not
    if (pathname === "/") {
      if (token) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } else {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  },
);

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/payment-history/:path*",
    "/pricing-plan/:path*",
    "/all-users/:path*",
    "/announcement/:path*",
    "/settings/:path*",
  ],
};
