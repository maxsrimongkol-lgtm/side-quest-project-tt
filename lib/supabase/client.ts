import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Singleton browser client for public read access to the quests table.
let client: ReturnType<typeof createSupabaseClient> | undefined

export function createClient() {
  if (client) return client

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  client = createSupabaseClient(supabaseUrl, supabaseAnonKey)

  return client
}
