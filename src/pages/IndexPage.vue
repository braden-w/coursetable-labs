<template>
  <q-page class="row items-center justify-evenly">
    <!-- <MobileTable></MobileTable> -->
    <!-- Await response -->
  </q-page>
</template>

<script lang="ts">
export default {
  async preFetch() {
    const res = await fetch('https://janktable.yaleapps.com/api/catalog');
    const catalog = await res.json();
    return { catalog };
  },
};
</script>

<script setup lang="ts"></script>
