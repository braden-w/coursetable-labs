<template>
  <q-select
    v-model="favoritesStore[keyOfFavoritesStore]"
    label="Select professors"
    :options="displayedProfessors"
    multiple
    clearable
    use-input
    use-chips
    filled
    menu-self="bottom middle"
    menu-anchor="top middle"
    @filter="filterFn"
  >
  </q-select>
</template>

<script setup lang="ts">
import Fuse from 'fuse.js';
import { useFavoritesStore } from 'src/stores/favorites';
import { ref, defineProps } from 'vue';
import { professors } from 'src/stores/professors';

const props = defineProps<{
  keyOfFavoritesStore: keyof typeof favoritesStore.$state;
}>();

const favoritesStore = useFavoritesStore();

const displayedProfessors = ref(professors);

function filterFn(val: string, update: (fn: () => void) => void) {
  const fuse = new Fuse(professors, {
    threshold: 0.4,
    includeScore: true,
  });

  if (val === '') {
    update(() => {
      displayedProfessors.value = professors;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    displayedProfessors.value = fuse
      .search(needle)
      .map((result) => result.item);
  });
}
</script>
