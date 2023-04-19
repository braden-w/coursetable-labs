import { defineStore } from 'pinia';
import { supabase } from 'src/supabase';
import { CatalogKeys } from 'src/types/catalog';
import { Course } from 'src/types/course';

type Column = {
  name: keyof Course;
  label: string;
  field: string;
  sortable: boolean;
  align: 'left' | 'right' | 'center';
};

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [],
    visibleColumns: [
      'course_code',
      'title',
      'all_course_codes',
      'areas',
      'average_rating',
      'average_rating_same_professors',
      'average_workload',
      'average_workload_same_professors',
      'average_gut_rating',
      'average_professor',
      'subject',
      'times_by_day',
    ] as CatalogKeys[],
    filter: '',
    pagination: { rowsPerPage: 0 },
  }),
  getters: {
    columns: (state) =>
      state.visibleColumns.map(
        (key): Column => ({
          name: key,
          label: keyToLabel(key),
          field: key,
          sortable: true,
          align: 'left',
        })
      ),
  },
  actions: {
    async fetchCatalog() {
      const { data, error } = await supabase
        .from('Courses')
        .select(this.visibleColumns.join(','))
        .eq('season_code', '202303')
        .limit(100);
      this.courses = data;
    },
  },
});

// Takes in string like "times_by_day" and returns "Times by Day"
function keyToLabel(label: string) {
  return label
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}
