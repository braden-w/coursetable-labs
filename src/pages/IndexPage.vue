<template>
  <q-page class="q-pa-md">
    <!-- <MobileTable></MobileTable> -->

    <q-card flat>
      <q-input
        filled
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search Courses..."
      >
        <template #append>
          <q-icon name="search" />
        </template>
        <template #after>
          <q-btn
            flat
            :icon="showSettings ? 'expand_less' : 'expand_more'"
            @click="toggleSettings"
          >
          </q-btn>
        </template>
      </q-input>
    </q-card>
    <q-table
      :rows="courses"
      :columns="columns"
      row-key="listing_id"
      :visible-columns="visibleColumns"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      :filter="filter"
      flat
    />
  </q-page>
</template>

<script lang="ts">
export default {
  async preFetch({ store }) {
    const coursesStore = useCoursesStore(store);
    coursesStore.fetchCatalog();
  },
};
</script>

<script setup lang="ts">
import { useCoursesStore } from 'src/stores/courses';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const coursesStore = useCoursesStore();
const { courses, columns, visibleColumns, filter, pagination } =
  storeToRefs(coursesStore);

const showSettings = ref(false);
function toggleSettings() {
  showSettings.value = !showSettings.value;
}
</script>
