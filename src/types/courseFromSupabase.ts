import { Database } from 'app/types/supabase';

export type CourseFromSupabase = Database['public']['Tables']['Courses']['Row'];
