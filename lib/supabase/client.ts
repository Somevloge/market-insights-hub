// lib/supabase/client.ts

import { createBrowserClient } from "@supabase/ssr";

// This client is safe for use in React Client Components.
// It uses NEXT_PUBLIC_ env vars, which are exposed to the browser.
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
