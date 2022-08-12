import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  //   Allow the request if the ff is true..
  // 1) It's a reuest for next-auth session and provider fetching
  // 2) the token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next(); //Grants access to the protected routes
  }

  //   Redirects user to login if they dont have a token and trying to access a protected route
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login"); //Redirect user to the login page
  }
}
