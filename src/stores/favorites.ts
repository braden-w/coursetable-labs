import { defineStore } from 'pinia';
import { supabase } from 'src/supabase';
import { CourseFromSupabase } from 'src/types/courseFromSupabase';

type CourseAbbreviated = Pick<
  CourseFromSupabase,
  'course_id' | 'all_course_codes' | 'title'
>;

type CourseOptions = {
  course_id: string;
  displayText: string;
};

const selectedColumns: (keyof CourseAbbreviated)[] = [
  'course_id',
  'all_course_codes',
  'title',
];

export const useFavoritesStore = defineStore('courses', {
  state: () => ({
    courses: [] as CourseAbbreviated[],
    selectedCourses: [] as CourseOptions[],
    filter: '',
    pagination: { rowsPerPage: 0 },
  }),
  getters: {
    courseOptions: (state) =>
      state.courses.map((course) => ({
        course_id: course.course_id,
        displayText: `${course.all_course_codes.join(' | ')} - ${course.title}`,
      })),
  },
  actions: {
    async fetchAbbreviatedCatalog() {
      const { data, error } = await supabase
        .from('Courses')
        .select(selectedColumns.join(','))
        .limit(1000);
      this.courses = data;
    },
  },
});
