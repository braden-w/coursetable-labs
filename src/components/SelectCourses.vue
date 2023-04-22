<template>
  <q-select
    v-model="selectedCourses"
    label="Select courses"
    :options="displayedCourseOptions"
    option-value="course_id"
    :option-label="getDisplayText"
    multiple
    clearable
    use-input
    use-chips
    filled
    menu-self="bottom middle"
    menu-anchor="top middle"
    @filter="filterFn"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-icon :name="getQuasarIcon(scope.opt)" />
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
import Fuse from 'fuse.js';
import { CourseAbbreviated, useFavoritesStore } from 'src/stores/favorites';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { getDisplayText } from 'src/utils/getDisplayText';

const favoritesStore = useFavoritesStore();
const { selectedCourses, courseOptions } = storeToRefs(favoritesStore);

const displayedCourseOptions = ref(courseOptions.value);

const fuse = new Fuse(courseOptions.value, {
  keys: ['all_course_codes', 'title'],
  threshold: 0.4,
  includeScore: true,
});

function filterFn(val: string, update) {
  if (val === '') {
    update(() => {
      displayedCourseOptions.value = courseOptions.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    displayedCourseOptions.value = fuse
      .search(needle)
      .map((result) => result.item);
  });
}

function getQuasarIcon(course: CourseAbbreviated) {
  const quasarIcons = {
    auto_stories: [
      'lit',
      'lang',
      'read',
      'writ',
      'novel',
      'poet',
      'engl',
      'phil',
      'hist',
    ],
    movie: ['film', 'cinema', 'movie', 'theater', 'theatre', 'drama'],
    computer: ['cpsc', 'comp', 'program', 'code', 'algo', 'software'],
    telescope: ['astronomy', 'space', 'cosmos', 'galaxy', 'star', 'planet'],
    biotech: ['biology', 'microbiology', 'cells', 'organisms', 'genetics'],
    psychology: ['neuro', 'psyc', 'cog', 'mind', 'intelligence'],
    science: ['chem', 'molec', 'at', 'sc', 'element', 'phy', 'research', 'bio'],
    headphones: ['mus', 'sound', 'audio'],
    health_and_safety: [
      'phys',
      'fit',
      'gym',
      'health',
      'exercise',
      'athletic',
      'sport',
    ],
    account_balance: [
      'econ',
      'finance',
      'money',
      'invest',
      'bus',
      'account',
      'bank',
    ],
    gavel: ['law', 'legal', 'crim', 'const', 'court', 'justice', 'rights'],
    public: [
      'geo',
      'cult',
      'anthro',
      'soci',
      'global',
      'intl',
      'relig',
      'glbl',
    ],
    // add more icons and keywords as needed
  };

  for (const [icon, keywords] of Object.entries(quasarIcons)) {
    for (const keyword of keywords) {
      if (
        course.title?.toLowerCase().includes(keyword) ||
        course.all_course_codes.some((code) =>
          code.toLowerCase().includes(keyword)
        )
      ) {
        return icon;
      }
    }
  }
  return 'school';
}
</script>
