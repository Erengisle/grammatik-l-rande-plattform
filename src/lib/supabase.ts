import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://oppdxwhwyqktivkyxjbj.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wcGR4d2h3eXFrdGl2a3l4amJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1MDg5NjMsImV4cCI6MjEwNTA4NDk2M30.FOwy7zIbzaRjvMBOmD9uHybSTM8yiEV7GjZv8yw990I";

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
