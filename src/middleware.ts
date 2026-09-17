import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const ALLOWED_ROLES = ["admin", "super_admin"];

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    const userRole = token?.role ? (token.role as string).toLowerCase() : "";
    const isAdmin = ALLOWED_ROLES.includes(userRole);

    if (!token || !isAdmin) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Redirect / to /dashboard if logged in as admin
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (!token?.role) return false;
        return ALLOWED_ROLES.includes((token.role as string).toLowerCase());
      },
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
