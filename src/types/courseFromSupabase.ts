import { Database } from 'app/types/supabase';
import { CourseFromApi } from './courseFromApi';

export type CourseFromSupabase = Database['public']['Tables']['Courses']['Row'];
export const catalogKeys: (keyof CourseFromApi)[] = [
  'all_course_codes',
  'areas',
  'average_gut_rating',
  'average_professor',
  'average_rating',
  'average_rating_same_professors',
  'average_workload',
  'average_workload_same_professors',
  'classnotes',
  'course_code',
  'credits',
  'crn',
  'description',
  'enrolled',
  'extra_info',
  'final_exam',
  'flag_info',
  'fysem',
  'last_enrollment',
  'last_enrollment_same_professors',
  'last_offered_course_id',
  'listing_id',
  'locations_summary',
  'number',
  'professor_ids',
  'professor_names',
  'regnotes',
  'requirements',
  'rp_attr',
  'same_course_and_profs_id',
  'same_course_id',
  'school',
  'season_code',
  'section',
  'skills',
  'subject',
  'syllabus_url',
  'times_by_day',
  'times_summary',
  'title',
];