import { defineStore } from 'pinia';
import { supabase } from 'src/supabase';
import { CourseFromSupabase } from 'src/types/courseFromSupabase';

export type CourseAbbreviated = Pick<
  CourseFromSupabase,
  'same_course_id' | 'all_course_codes' | 'title'
>;

const selectedColumns: (keyof CourseAbbreviated)[] = [
  'same_course_id',
  'all_course_codes',
  'title',
];

export const useFavoritesStore = defineStore('courses', {
  state: () => ({
    courses: [] as CourseAbbreviated[],
    selectedCourses: [] as CourseAbbreviated[],
    filter: '',
    pagination: { rowsPerPage: 0 },
  }),
  actions: {
    async fetchAbbreviatedCatalog() {
      // const { data, error } = await supabase
      //   .from('Courses')
      //   .select(selectedColumns.join(','))
      //   .gt('season_code', '202003');

      // Fetch json from 'https://qgwabimelbyerzbvkngr.supabase.co/storage/v1/object/public/json_views/CoursesDisplayDropdown.json'
      const response = await fetch(
        'https://qgwabimelbyerzbvkngr.supabase.co/storage/v1/object/public/json_views/CoursesDisplayDropdown.json'
      );
      const data = await response.json();
      this.courses = data;
    },
  },
});
