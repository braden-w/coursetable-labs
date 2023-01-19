<template>
  <q-page class="row items-center justify-evenly">
    <!-- <MobileTable></MobileTable> -->
    {{ catalog }}
  </q-page>
</template>

<script setup lang="ts">
import { Catalog } from 'src/types/catalog';
import { ref, onBeforeMount } from 'vue';
async function fetchCatalog() {
  const res = await fetch('https://janktable.yaleapps.com/api/catalog');
  const catalog = (await res.json()) as Catalog;
  return catalog;
}

const catalog = ref();

onBeforeMount(async () => {
  catalog.value = await fetchCatalog();
});
</script>
