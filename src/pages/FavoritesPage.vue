<template>
  <q-page class="flex flex-center">
    <div class="column items-center">
      <q-card flat class="my-card q-ma-sm">
        <q-card-section>
          <div class="text-h4">Yale Course Survey</div>
          <div class="text-subtitle1">Please share your course experiences</div>
        </q-card-section>
      </q-card>

      <q-card flat class="my-card q-ma-sm">
        <q-card-section>
          <div class="text-h6">What courses have you taken so far?</div>
          <q-input outlined v-model="coursesTaken" class="q-mt-sm" />
        </q-card-section>
      </q-card>

      <q-card flat class="my-card q-ma-sm">
        <q-card-section>
          <div class="text-h6">
            What courses have been your favorite courses at Yale?
          </div>
          <q-input outlined v-model="favoriteCourses" class="q-mt-sm" />
        </q-card-section>
      </q-card>

      <q-card flat class="my-card q-ma-sm">
        <q-card-section>
          <div class="text-h6">Any words to defend your choices?</div>
          <q-input outlined v-model="defendChoices" class="q-mt-sm" />
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
  width: 80rem;
}
</style>
