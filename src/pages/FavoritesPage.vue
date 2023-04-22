<template>
  <q-page class="q-pt-md">
    <q-stepper v-model="activeStep" class="max-width-card q-mx-auto" flat>
      <q-step :name="0" title="Introduction">
        <q-step-content>
          <q-card flat class="max-width-card q-mb-md q-pa-md">
            <q-card-section>
              <div class="text-h4 text-weight-light q-mb-md">
                What are your favorite courses at Yale?
              </div>
              <div class="text-subtitle1 text-weight-light">
                As we wrap up the school year, let's reflect on the courses that
                defined our college careers. Please share your favorite courses.
                I wish I could use a Google Form but there are too many courses
                to list, so this form uses custom rendering.
              </div>
            </q-card-section>
          </q-card>

          <q-card flat class="max-width-card q-mb-md">
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

          <q-card flat class="max-width-card q-mb-md">
            <q-card-section>
              <div class="text-h6 text-weight-light q-mb-md">
                What is your major?
              </div>
              <SelectMajor />
            </q-card-section>
          </q-card>

          <div class="q-mt-md">
            <q-btn
              color="primary"
              label="Next"
              @click="nextStep"
              :disable="!isStep1Valid"
            />
          </div>
        </q-step-content>
      </q-step>

      <q-step :name="1" title="Overall">
        <q-step-content>
          <q-card flat class="max-width-card q-mb-md">
            <q-card-section>
              <div class="text-h6 text-weight-light q-mb-md">
                Who have been your
                <span class="text-weight-bold"> favorite </span> professors at
                Yale?
              </div>
              <q-input
                filled
                label="Favorite Professors"
                v-model="favoriteProfessors"
                hint="Enter a comma-separated list of professor first and last names "
              />
            </q-card-section>
          </q-card>

          <q-card flat class="max-width-card q-mb-md">
            <q-card-section>
              <div class="text-h6 text-weight-light q-mb-md">
                What courses have been your
                <span class="text-weight-bold"> best </span> courses at Yale?
              </div>
              <SelectCourses />
            </q-card-section>
          </q-card>

          <q-card flat class="max-width-card q-mb-md">
            <q-card-section>
              <div class="text-h6 text-weight-light q-mb-md">
                What courses have been your
                <span class="text-weight-bold">worst</span> courses at Yale?
              </div>
              <SelectCourses />
            </q-card-section>
          </q-card>

          <div class="q-mt-md">
            <q-btn
              color="primary"
              label="Previous"
              @click="previousStep"
              class="q-mr-sm"
            />
            <q-btn
              color="primary"
              label="Next"
              @click="nextStep"
              :disable="!isStep2Valid"
            />
          </div>
        </q-step-content>
      </q-step>

      <q-step :name="2" title="Domain Specific">
        <q-step-content>
          <q-card flat class="max-width-card q-mb-md">
            <q-card-section>
              <div class="text-h6 text-weight-light q-mb-md">
                Any remarks or words to defend your choices?
              </div>
              <q-input filled v-model="remarks" />
            </q-card-section>
          </q-card>

          <div class="q-mt-md">
            <q-btn
              color="primary"
              label="Previous"
              @click="previousStep"
              class="q-mr-sm"
            />
            <q-btn
              color="primary"
              label="Submit"
              @click="submitForm"
              :disable="!isStep3Valid"
            />
          </div>
        </q-step-content>
      </q-step>
    </q-stepper>
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
import SelectMajor from './SelectMajor.vue';
import { useMutation } from '@tanstack/vue-query';
import SelectCourses from 'src/components/SelectCourses.vue';
import { useFavoritesStore } from 'src/stores/favorites';
import { supabase } from 'src/supabase';
import { getDisplayText } from 'src/utils/getDisplayText';
import { computed, ref } from 'vue';

const favoritesStore = useFavoritesStore();
const showDialog = ref(false);

const activeStep = ref(0);
const email = ref('');
const remarks = ref('');
const favoriteProfessors = ref('');

function isValidEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

async function submitForm() {
  const { error } = await supabase.from('UserCourse').insert({
    email: email.value,
    selected_courses: favoritesStore.selectedCourses,
    favorite_professors: favoriteProfessors.value,
    remarks: remarks.value,
    favorite_courses: favoritesStore.selectedCourses
      .map((course) => getDisplayText(course))
      .join(';'),
  });
}

async function handleFormSubmission() {
  submitUserCourseMutation();
}

const { isLoading: isSubmitLoading, mutate: submitUserCourseMutation } =
  useMutation(submitForm);

const isFormValid = computed(() => {
  return isValidEmail(email.value) && favoritesStore.selectedCourses.length > 0;
});

const isStep1Valid = computed(() => {
  return isValidEmail(email.value);
});

const isStep2Valid = computed(() => {
  return major.value.length > 0 && favoriteProfessors.value !== '';
});

const isStep3Valid = computed(() => {
  return favoritesStore.selectedCourses.length > 0;
});

function nextStep() {
  activeStep.value++;
}

function previousStep() {
  activeStep.value--;
}
</script>

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
