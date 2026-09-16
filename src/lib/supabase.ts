import { createClient } from "@supabase/supabase-js";

// Reuses the "Hi-tester, Forntid till 1789" Supabase project (same
// database/auth as that app) so we can piggyback on its already-working
// Google sign-in — Google Cloud Console is blocked for this Google
// Workspace org, so a separate OAuth client can't be set up right now.
// Sessions written by this app are tagged app_tag: "grammatik" so they
// can be told apart from Hi-tester's own quiz results.
const SUPABASE_URL = "https://dkisazpnzyqmcacdlnsk.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRraXNhenBuenlxbWNhY2RsbnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MzE1MDAsImV4cCI6MjA5NzIwNzUwMH0.e7TGqXuv9bTbyGJ8xA3lzjjiNQhmvLEYzTxntF0PjwY";

export const APP_TAG = "grammatik";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: window.location.href },
  });
}

export function signOut() {
  return supabase.auth.signOut();
}
