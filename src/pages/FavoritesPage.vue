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
    @filter="filterFn"
  />
</template>

<script lang="ts">
export default {
  async preFetch({ store }) {
    const favoritesStore = useFavoritesStore(store);
    favoritesStore.fetchAbbreviatedCatalog();
  },
};
</script>
<script setup lang="ts">
import { useFavoritesStore } from 'src/stores/favorites';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const favoritesStore = useFavoritesStore();
const { selectedCourses, courseOptions } = storeToRefs(favoritesStore);

const displayedCourseOptions = ref(courseOptions.value);

// const filterFn = (val: string, update: (options: any[]) => void) => {
//   update(
//     courseOptions.value.filter((option) => {
//       return option.displayText.toLowerCase().includes(val.toLowerCase());
//     })
//   );
// };

function filterFn(val: string, update) {
  // if (val === '') {
  //   update(() => {
  //     options.value = stringOptions

  //     // here you have access to "ref" which
  //     // is the Vue reference of the QSelect
  //   })
  //   return
  // }

  update(() => {
    const needle = val.toLowerCase();
    displayedCourseOptions.value = courseOptions.value.filter(
      (v) => v.displayText.toLowerCase().indexOf(needle) > -1
    );
  });
}
</script>
