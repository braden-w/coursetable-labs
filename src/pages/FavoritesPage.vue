<template>
  <q-page class="q-pt-md">
    <q-form @submit.prevent="submitForm" class="column items-center">
      <q-card flat class="my-card q-mb-md">
        <q-card-section>
          <div class="text-h4 text-weight-light q-mb-md">
            What is your favorite courses at Yale?
          </div>
          <div class="text-subtitle1 text-weight-light">
            As we wrap up the school year, let's reflect. Please share your
            course experiences. I wish I could use a Google Form but there are
            too much
          </div>
        </q-card-section>
      </q-card>

      <q-card flat class="my-card q-mb-md">
        <q-card-section>
          <div class="text-h6 text-weight-light q-mb-md">
            What is your email address?
          </div>
          <q-input
            filled
            label="Email"
            v-model="email"
            :rules="[
              (val) => isValidEmail(val) || 'Please enter a valid email',
            ]"
          />
        </q-card-section>
      </q-card>

      <q-card flat class="my-card q-mb-md">
        <q-card-section>
          <div class="text-h6 text-weight-light q-mb-md">
            What courses have been your favorite courses at Yale?
          </div>
          <SelectCourses />
        </q-card-section>
      </q-card>

      <q-card flat class="my-card q-mb-md">
        <q-card-section>
          <div class="text-h6 text-weight-light q-mb-md">
            Any words to defend your choices?
          </div>
          <q-input filled v-model="defendChoices" />
        </q-card-section>
      </q-card>

      <q-card flat class="my-card q-mb-md">
        <q-btn
          :color="isFormValid ? 'primary' : 'dark'"
          label="Submit"
          type="submit"
          :disable="!isFormValid"
          class="full-width"
        />
      </q-card>
    </q-form>
  </q-page>
</template>
<script lang="ts">
export default {
  async preFetch({ store }) {
    const favoritesStore = useFavoritesStore(store);
    favoritesStore.fetchAbbreviatedCatalog();
  },
};
</script>
<script setup lang="ts">
import SelectCourses from 'src/components/SelectCourses.vue';
import { useFavoritesStore } from 'src/stores/favorites';
import { computed, ref } from 'vue';

const favoritesStore = useFavoritesStore();

const email = ref('');
const defendChoices = ref('');

function isValidEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function submitForm() {
  // Add implementation for form submission.
}

const isFormValid = computed(() => {
  return isValidEmail(email.value) && favoritesStore.selectedCourses.length > 0;
});
</script>
<style>
.my-card {
  width: 48rem;
  border-radius: 8px;
}
</style>
