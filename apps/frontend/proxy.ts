// import { NextRequest, NextResponse } from "next/server";
// // import { getSessionCookie } from "better-auth/cookies";

// const protectedRoutes = ["/profile"];

// export async function proxy(req: NextRequest) {
//   const { nextUrl } = req;
//   const sessionCookie = getSessionCookie(req);

//   const res = NextResponse.next();

//   const isLoggedIn = !!sessionCookie;
//   console.log(isLoggedIn);
//   const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
//   const isOnAuthRoute = nextUrl.pathname.startsWith("/auth");

//   if (isOnProtectedRoute && !isLoggedIn) {
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }

//   if (isOnAuthRoute && isLoggedIn) {
//     return NextResponse.redirect(new URL("/profile", req.url));
//   }

//   return res;
// }

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
//   ],
// };

import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const EXPRESS_AUTH_URL = "http://localhost:3001/api/auth/get-session";

export async function proxy(req: NextRequest) {
  const { nextUrl } = req;

  // 1. Forward the cookies from Next.js to Express
  const cookieHeader = req.headers.get("cookie") || "";
  console.log("proxy", cookieHeader);
  let session = null;
  try {
    const authRes = await fetch(EXPRESS_AUTH_URL, {
      headers: {
        // Crucial: Pass the browser cookies to the backend
        cookie: cookieHeader,
      },
    });

    if (authRes.ok) {
      session = await authRes.json();
      console.log(session);
    }
  } catch (error) {
    console.error("Auth Backend Unreachable:", error);
  }

  // 2. Logic Check
  const isLoggedIn = !!session && session.user; // Ensure session and user exist
  const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isOnAuthRoute = nextUrl.pathname.startsWith("/auth");

  // Redirect to login if accessing protected route while logged out
  if (isOnProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  // Redirect to profile if accessing auth route while logged in
  if (isOnAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
