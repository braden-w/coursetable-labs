<template>
  <q-select
    v-model="selectedCourses"
    label="Select courses"
    :options="displayedCourseOptions"
    option-value="course_id"
    option-label="displayText"
    multiple
    clearable
    use-input
    filled
    use-chips
    @filter="filterFn"
  />
</template>

<script setup lang="ts">
import { useFavoritesStore } from 'src/stores/favorites';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const favoritesStore = useFavoritesStore();
const { selectedCourses, courseOptions } = storeToRefs(favoritesStore);

const displayedCourseOptions = ref(courseOptions.value);

function filterFn(val: string, update) {
  if (val === '') {
    update(() => {
      displayedCourseOptions.value = courseOptions.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    displayedCourseOptions.value = courseOptions.value.filter(
      (v) => v.displayText.toLowerCase().indexOf(needle) > -1
    );
  });
}
</script>
