import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project-id') &&
    supabaseUrl.startsWith('http')
);

/**
 * Creates a Supabase client scoped with the anonymous user ID header
 * so Row Level Security (RLS) policies isolate data per device without email/password login.
 * Never uses SUPABASE_SERVICE_ROLE_KEY on the frontend.
 */
export const getScopedSupabaseClient = (anonUserId: string): SupabaseClient | null => {
  if (!isSupabaseConfigured) return null;

  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        'x-anonymous-user-id': anonUserId,
      },
    },
  });
};

