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
    menu-self="bottom middle"
    menu-anchor="top middle"
    @filter="filterFn"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-icon :name="getQuasarIcon(scope.opt.title)" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.title }}</q-item-label>
          <q-item-label caption>{{
            scope.opt.all_course_codes.join(', ')
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
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

function getQuasarIcon(string) {
  const quasarIcons = {
    computer: [
      'cpsc',
      'computer',
      'programming',
      'code',
      'algorithm',
      'software',
    ],
    telescope: ['astronomy', 'space', 'cosmos', 'galaxy', 'star', 'planet'],
    biotech: ['biology', 'microbiology', 'cells', 'organisms', 'genetics'],
    psychology: [
      'neuroscience',
      'psychology',
      'cognition',
      'mind',
      'intelligence',
    ],
    science: ['chemistry', 'molecule', 'atomic', 'science', 'element'],
    auto_stories: [
      'literature',
      'language',
      'reading',
      'writing',
      'novel',
      'poetry',
      'philosophy',
    ],
    headphones: ['music', 'sound', 'audio'],
    // add more icons and keywords as needed
  };

  for (const [icon, keywords] of Object.entries(quasarIcons)) {
    for (const keyword of keywords) {
      if (string.toLowerCase().includes(keyword)) {
        return icon;
      }
    }
  }
}
</script>
