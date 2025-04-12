
import { createClient } from '@supabase/supabase-js';

// In a real app, these would be environment variables
const supabaseUrl = 'https://example.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);