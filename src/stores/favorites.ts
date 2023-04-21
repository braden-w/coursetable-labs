import { defineStore } from 'pinia';
import { supabase } from 'src/supabase';
import { CourseFromSupabase } from 'src/types/courseFromSupabase';

type CourseAbbreviated = Pick<
  CourseFromSupabase,
  'same_course_id' | 'all_course_codes' | 'title'
>;

type CourseOptions = {
  course_id: string;
  displayText: string;
};

const selectedColumns: (keyof CourseAbbreviated)[] = [
  'same_course_id',
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
        all_course_codes: course.all_course_codes,
        same_course_id: course.same_course_id,
        title: course.title,
      })),
  },
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
