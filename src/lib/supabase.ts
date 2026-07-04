import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Returns a Supabase client, or null if not configured (so the site never
// crashes when the env vars are missing — it just falls back to sample data).
export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export interface DbReview {
  id: string;
  name: string;
  text: string;
  stars: number;
  approved: boolean;
  created_at: string;
}
