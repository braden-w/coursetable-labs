<template>
  <q-select
    v-model="selectedCourses"
    label="Select courses"
    :options="courseOptions"
    option-value="course_id"
    option-label="displayText"
    multiple
    clearable
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedCourses = ref([]);
const courses = [
  {
    course_id: 1,
    all_course_codes: ['COMP101', 'INFO101'],
    title: 'Introduction to Computer Science',
  },
  {
    course_id: 2,
    all_course_codes: ['MATH101', 'STAT101'],
    title: 'Introduction to Mathematics',
  },
  // Add more courses here
];

const courseOptions = courses.map((course) => {
  return {
    course_id: course.course_id,
    displayText: `${course.all_course_codes.join('/')} - ${course.title}`,
  };
});
</script>
