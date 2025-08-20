// lib/supabase/server.ts

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// This client is for Server Components, Route Handlers, and Middleware.
// It uses the request cookies to handle SSR-friendly auth.
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Ignore "read-only" errors in edge runtimes
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // Ignore "read-only" errors in edge runtimes
          }
        },
      },
    }
  );
}
