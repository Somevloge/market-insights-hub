// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Middleware for handling Supabase authentication and protecting routes.
 *
 * Features:
 * - Creates a Supabase server client using @supabase/ssr
 * - Automatically refreshes session tokens by handling cookies
 * - Protects /dashboard route: redirects unauthenticated users to home (/)
 */
export async function middleware(req: NextRequest) {
  // Create a response object that can be modified (cookies, headers, etc.)
  const res = NextResponse.next({ request: { headers: req.headers } });

  // Initialize Supabase client with SSR support
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          // Update cookies in the response
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          res.cookies.delete({ name, ...options });
        },
      },
    }
  );

  // Refresh the session by fetching the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect /dashboard route
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!user) {
      // Redirect to home page if not authenticated
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

// Configure which routes should invoke the middleware
export const config = {
  matcher: ["/dashboard/:path*"], // Only run middleware on /dashboard routes
};
