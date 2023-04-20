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
    courseOptions: [],
    filter: '',
    pagination: { rowsPerPage: 0 },
  }),
  actions: {
    async fetchAbbreviatedCatalog() {
      const { data, error } = await supabase
        .from('Courses')
        .select(this.selectColumns.join(','))
        .eq('season_code', '202303')
        .limit(10);
      this.courseOptions = data;
    },
  },
});
