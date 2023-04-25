import { defineStore } from 'pinia';
import { supabase } from 'src/supabase';
import { CourseFromSupabase } from 'src/types/courseFromSupabase';
import { getDisplayText } from 'src/utils/getDisplayText';

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
    email: '',
    major: [] as string[],
    selectedFavoriteProfessors: '',
    selectedFavoriteCourses: [] as CourseAbbreviated[],
    selectedGuttiestCourses: [] as CourseAbbreviated[],
    selectedFavoriteHumanitesCourses: [] as CourseAbbreviated[],
    selectedFavoriteSocialScienceCourses: [] as CourseAbbreviated[],
    selectedFavoriteScienceCourses: [] as CourseAbbreviated[],
    selectedFavoriteQrCourses: [] as CourseAbbreviated[],
    selectedFavoriteWritingCourses: [] as CourseAbbreviated[],
    remarks: '',
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
    async submitForm() {
      const { error } = await supabase.from('UserCourse').insert({
        email: this.email,
        selected_courses: this.selectedFavoriteCourses,
        favorite_professors: this.selectedFavoriteProfessors,
        remarks: this.remarks,
        favorite_courses: this.selectedFavoriteCourses
          .map((course) => getDisplayText(course))
          .join(';'),
      });
    },
  },
});
