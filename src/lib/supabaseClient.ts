import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// --- Debugging START ---
// These logs will appear in your server-side terminal when the app starts/reloads.
// Check these logs to see if the environment variables are loaded.
console.log('DEBUG supabaseClient.ts: NEXT_PUBLIC_SUPABASE_URL =', process.env.NEXT_PUBLIC_SUPABASE_URL);
// For security, we only log if the ANON_KEY exists, not its value.
console.log('DEBUG supabaseClient.ts: NEXT_PUBLIC_SUPABASE_ANON_KEY Exists =', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
// --- Debugging END ---

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("Supabase URL not found. Make sure NEXT_PUBLIC_SUPABASE_URL is set in your .env file.");
}

if (!supabaseAnonKey) {
  throw new Error("Supabase anon key not found. Make sure NEXT_PUBLIC_SUPABASE_ANON_KEY is set in your .env file.");
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
