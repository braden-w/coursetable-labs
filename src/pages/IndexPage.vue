<template>
  <q-page class="row items-center justify-evenly">
    <!-- <MobileTable></MobileTable> -->
    <q-table :data="data" :columns="columns" row-key="id" />
  </q-page>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { Catalog } from 'src/types/catalog';

type Column = {
  name: keyof Catalog;
  label: string;
  field: string;
  sortable: boolean;
};
// For each key in Catalog, create a column
const columns: Column[] = Object.keys(Catalog).map((key) => ({
  name: key as keyof Catalog,
  label: key,
  field: key,
  sortable: true,
}));
const { isLoading, isFetching, isError, data, error } = useQuery({
  queryKey: ['catalog'],
  queryFn: fetchCatalog,
});

async function fetchCatalog() {
  const res = await fetch('https://janktable.yaleapps.com/api/catalog');
  const catalog = (await res.json()) as Catalog;
  return catalog;
}

// onBeforeMount(async () => {
//   catalog.value = await fetchCatalog();
// });
</script>
