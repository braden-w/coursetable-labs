import { Database } from 'app/types/supabase';
import { Area, Skill } from './courseFromApi';

type Row = Database['public']['Tables']['Courses']['Row'];
export interface CourseFromSupabase extends Row {
  all_course_codes: string[];
  areas: Area[];
  skills: Skill[];
}
