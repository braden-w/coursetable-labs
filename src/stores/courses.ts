import { defineStore } from 'pinia';

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [],
  }),
  actions: {},
});
