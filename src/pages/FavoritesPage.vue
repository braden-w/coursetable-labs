<template>
  <q-page class="q-pt-md">
    <div class="column items-center">
      <q-card flat class="my-card q-mb-md">
        <q-card-section>
          <div class="text-h3 q-mb-md">
            What is your favorite courses at Yale?
          </div>
          <div class="text-subtitle1">Please share your course experiences</div>
        </q-card-section>
      </q-card>

      <q-card flat class="my-card q-mb-md">
        <q-card-section>
          <div class="text-h6 q-mb-md">What courses have you taken so far?</div>
          <q-input standout v-model="coursesTaken" class="q-mt-sm" />
        </q-card-section>
      </q-card>

      <q-card flat class="my-card q-mb-md">
        <q-card-section>
          <div class="text-h6 q-mb-md">
            What courses have been your favorite courses at Yale?
          </div>
          <q-input standout v-model="favoriteCourses" class="q-mt-sm" />
        </q-card-section>
      </q-card>

      <q-card flat class="my-card q-mb-md">
        <q-card-section>
          <div class="text-h6 q-mb-md">Any words to defend your choices?</div>
          <q-input standout v-model="defendChoices" class="q-mt-sm" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      coursesTaken: '',
      favoriteCourses: '',
      defendChoices: '',
    };
  },
};
</script>

<style>
.my-card {
  width: 48rem;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
}
</style>
