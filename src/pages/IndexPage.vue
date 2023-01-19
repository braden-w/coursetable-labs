<template>
  <q-page class="row items-center justify-evenly">
    <!-- <MobileTable></MobileTable> -->
    <!-- Await response -->
    {{ catalog }}
  </q-page>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
async function fetchCatalog() {
  const res = await fetch('https://janktable.yaleapps.com/api/catalog');
  const catalog = await res.json();
  return catalog;
}

const catalog = ref();

onBeforeMount(async () => {
  catalog.value = await fetchCatalog();
});
</script>
