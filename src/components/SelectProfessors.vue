<template>
  <q-select
    v-model="favoritesStore[keyOfFavoritesStore]"
    :label="label"
    :options="displayedProfessors"
    multiple
    clearable
    use-input
    use-chips
    filled
    menu-self="top middle"
    menu-anchor="bottom middle"
    @filter="filterFn"
  >
  </q-select>
</template>

<script setup lang="ts">
import { useFavoritesStore } from 'src/stores/favorites';
import { ref, defineProps } from 'vue';
import { professors } from 'src/stores/professors';

const props = defineProps<{
  keyOfFavoritesStore: keyof typeof favoritesStore.$state;
  label: string;
}>();

const favoritesStore = useFavoritesStore();

const displayedProfessors = ref(professors);

function filterFn(val: string, update: (fn: () => void) => void) {
  if (val === '') {
    update(() => {
      displayedProfessors.value = professors;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    displayedProfessors.value = professors.filter(
      (professor) => professor.toLowerCase().indexOf(needle) > -1
    );
  });
}
</script>
