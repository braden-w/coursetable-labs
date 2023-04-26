<template>
  <q-page padding>
    <q-card flat class="max-width-card q-mx-auto">
      <q-card-section>
        <div class="text-h4 text-weight-light q-mb-md">Thank You! 🎉</div>
        <div class="text-subtitle1 text-weight-light q-mb-md">
          Your responses have been recorded, and you will be emailed results in
          May.
        </div>
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
