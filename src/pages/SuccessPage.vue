<template>
  <q-page padding>
    <q-card flat class="max-width-card q-mx-auto">
      <q-card-section>
        <div class="text-h4 text-weight-light q-mb-md">Thank You! 🎉</div>
        <div class="text-subtitle1 text-weight-light q-mb-md">
          Your responses have been recorded, and you will be emailed results on
          May 1.
        </div>
        <!-- <vue-confetti
            :confetti-options="{
              angle: 90,
              spread: 45,
              startVelocity: 45,
              elementCount: 50,
              decay: 0.9,
              colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
            }"
            :fire-once="true"
          /> -->
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts"></script>
<style>
.max-width-card {
  width: 100%;
  border-radius: 8px;
}
@media (min-width: 640px) {
  .max-width-card {
    max-width: 48rem;
  }
}
</style>
