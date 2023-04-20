import { defineStore } from 'pinia';
import { supabase } from 'src/supabase';
import { CourseFromSupabase } from 'src/types/courseFromSupabase';

const selectColumns: (keyof CourseFromSupabase)[] = [
  'course_id',
  'all_course_codes',
  'title',
];

export const useFavoritesStore = defineStore('courses', {
  state: () => ({
    courses: [] as CourseFromSupabase[],
    filter: '',
    pagination: { rowsPerPage: 0 },
  }),
  getters: {
    courseOptions: (state) =>
      state.courses.map((course) => ({
        course_id: course.course_id,
        displayText: `${course.all_course_codes.join('/')} - ${course.title}`,
      })),
  },
  actions: {
    async fetchAbbreviatedCatalog() {
      const { data, error } = await supabase
        .from('Courses')
        .select(selectColumns.join(','))
        .eq('season_code', '202303')
        .limit(10);
      this.courses = data;
    },
  },
});
