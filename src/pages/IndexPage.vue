<template>
  <q-page class="q-pa-md">
    <!-- <MobileTable></MobileTable> -->

    <q-card flat>
      <q-input
        filled
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search Menus..."
        ref="searchInput"
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
      :rows="data"
      :columns="columns"
      row-key="listing_id"
      :loading="isLoading"
      :visible-columns="visibleColumns"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      :filter="filter"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { Catalog, catalogKeys, CatalogKeys } from 'src/types/catalog';
import { Course } from 'src/types/course';
import { ref } from 'vue';

type Column = {
  name: keyof Course;
  label: string;
  field: string;
  sortable: boolean;
  align: 'left' | 'right' | 'center';
};

const showSettings = ref(false);
function toggleSettings() {
  showSettings.value = !showSettings.value;
}
const filter = ref('');

const pagination = ref({
  rowsPerPage: 0,
});

const columns: Column[] = catalogKeys.map(
  (key): Column => ({
    name: key as keyof Course,
    label: keyToLabel(key),
    field: key,
    sortable: true,
    align: 'left',
  })
);
const visibleColumns: CatalogKeys[] = [
  'course_code',
  'title',
  'all_course_codes',
  'areas',
  'average_rating',
  'average_rating_same_professors',
  'average_workload',
  'average_workload_same_professors',
  'average_gut_rating',
  'average_professor',
  'subject',
  'times_by_day',
];

const { isLoading, isFetching, isError, data, error } = useQuery({
  queryKey: ['catalog'],
  queryFn: fetchCatalog,
});

async function fetchCatalog() {
  const res = await fetch('https://janktable.yaleapps.com/api/catalog');
  const catalog = (await res.json()) as Catalog;
  const theseFieldsToTwoDecimals: CatalogKeys[] = [
    'average_gut_rating',
    'average_professor',
    'average_rating',
    'average_rating_same_professors',
    'average_workload',
    'average_workload_same_professors',
  ];
  return catalog.map((course) => {
    theseFieldsToTwoDecimals.forEach((key) => {
      course[key] = Number(course[key]).toFixed(2);
    });
    return course;
  });
}

// Takes in string like "times_by_day" and returns "Times by Day"
function keyToLabel(label: string) {
  return label
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

// onBeforeMount(async () => {
//   catalog.value = await fetchCatalog();
// });
</script>
