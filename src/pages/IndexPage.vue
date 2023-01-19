<template>
  <q-page class="q-pa-md">
    <!-- <MobileTable></MobileTable> -->
    <q-table
      title="Courses"
      :rows="data"
      :columns="columns"
      row-key="name"
      :loading="isLoading"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { Catalog } from 'src/types/catalog';
import { catalogKeys } from 'src/types/catalogKeys';
import { ref } from 'vue';

type Column = {
  name: keyof Catalog;
  label: string;
  field: string;
  sortable: boolean;
};

const pagination = ref({
  rowsPerPage: 0,
});

const columns: Column[] = catalogKeys.map(
  (key): Column => ({
    name: key as keyof Catalog,
    label: keyToLabel(key),
    field: key,
    sortable: true,
  })
);
const { isLoading, isFetching, isError, data, error } = useQuery({
  queryKey: ['catalog'],
  queryFn: fetchCatalog,
});

async function fetchCatalog() {
  const res = await fetch('https://janktable.yaleapps.com/api/catalog');
  const catalog = await res.json();
  return catalog;
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
