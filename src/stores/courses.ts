import { defineStore } from 'pinia';
import { supabase } from 'src/supabase';

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [],
  }),
  actions: {},
});
