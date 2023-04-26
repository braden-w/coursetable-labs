<template>
  <q-page class="q-pt-md">
    <q-stepper v-model="activeStep" class="max-width-card q-mx-auto" flat>
      <q-step :name="0" title="Introduction">
        <q-step-content>
          <q-card flat class="q-mb-lg">
            <q-card-section>
              <div class="text-h4 text-weight-light q-mb-md">
                What are your favorite courses and professors at Yale?
              </div>
              <div class="text-subtitle1 text-weight-light">
                As we wrap up the school year, let's reflect on the courses and
                professors that defined our college experiences. Please share
                your favorite courses. Your input will help future students
                choose their courses and add nostalgia. Results will be shared
                with respondents on May 1.
              </div>
            </q-card-section>
          </q-card>

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

          <q-card-section>
            <div class="text-h6 text-weight-light q-mb-md">
              What is your major?
            </div>
            <SelectMajor />
          </q-card-section>

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

      <q-step :name="1" title="Overall Favorites">
        <q-step-content>
          <q-card-section>
            <div class="text-h6 text-weight-light q-mb-md">
              Who have been your
              <span class="text-weight-bold"> favorite </span> professors at
              Yale?
            </div>
            <SelectProfessors
              keyOfFavoritesStore="selectedFavoriteProfessors"
            />
          </q-card-section>

          <q-card-section>
            <div class="text-h6 text-weight-light q-mb-md">
              What courses have been your
              <span class="text-weight-bold"> best </span> courses at Yale?
            </div>
            <SelectCourses keyOfFavoritesStore="selectedFavoriteCourses" />
          </q-card-section>

          <q-card-section>
            <div class="text-h6 text-weight-light q-mb-md">
              What courses have been your
              <span class="text-weight-bold">chillest</span> courses at Yale?
            </div>
            <SelectCourses keyOfFavoritesStore="selectedGuttiestCourses" />
          </q-card-section>

          <q-card-section>
            <div class="text-h6 text-weight-light q-mb-md">
              Any remarks or words to defend your choices?
            </div>
            <q-input filled v-model="remarks" />
          </q-card-section>

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

      <q-step :name="2" title="Category Favorites">
        <q-step-content>
          <q-card-section>
            <div class="text-h6 text-weight-light q-mb-md">
              Best <span class="text-weight-bold">writing</span> credit?
            </div>
            <SelectCourses
              keyOfFavoritesStore="selectedFavoriteWritingCourses"
            />
          </q-card-section>

          <q-card-section>
            <div class="text-h6 text-weight-light q-mb-md">
              Best <span class="text-weight-bold">science credit</span>
              credit?
            </div>
            <SelectCourses
              keyOfFavoritesStore="selectedFavoriteScienceCourses"
            />
          </q-card-section>

          <q-card-section>
            <div class="text-h6 text-weight-light q-mb-md">
              Best <span class="text-weight-bold">QR</span> credit?
            </div>
            <SelectCourses keyOfFavoritesStore="selectedFavoriteQrCourses" />
          </q-card-section>

          <q-card-section>
            <div class="text-h6 text-weight-light q-mb-md">
              Best <span class="text-weight-bold">social science</span>
              credit?
            </div>
            <SelectCourses
              keyOfFavoritesStore="selectedFavoriteSocialScienceCourses"
            />
          </q-card-section>

          <q-card-section>
            <div class="text-h6 text-weight-light q-mb-md">
              Best <span class="text-weight-bold">humanities</span> credit?
            </div>
            <SelectCourses
              keyOfFavoritesStore="selectedFavoriteHumanitesCourses"
            />
          </q-card-section>

          <q-card-section>
            <div class="text-h6 text-weight-light q-mb-md">
              Best <span class="text-weight-bold">lecture</span> credit?
            </div>
            <SelectCourses
              keyOfFavoritesStore="selectedFavoriteLectureCourses"
            />
          </q-card-section>

          <q-card-section>
            <div class="text-h6 text-weight-light q-mb-md">
              Best <span class="text-weight-bold">seminar</span> credit?
            </div>
            <SelectCourses
              keyOfFavoritesStore="selectedFavoriteSeminarCourses"
            />
          </q-card-section>

          <q-card-section>
            <div class="text-h6 text-weight-light q-mb-md">
              Best courses in your major(s):
              <span class="text-weight-bold">{{ major.join(', ') }}</span>
            </div>
            <SelectCourses keyOfFavoritesStore="selectedFavoriteMajorCourses" />
          </q-card-section>

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
              @click="handleFormSubmission"
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
import { storeToRefs } from 'pinia';
import SelectProfessors from 'src/components/SelectProfessors.vue';
import SelectCourses from 'src/components/SelectCourses.vue';
import { useFavoritesStore } from 'src/stores/favorites';
import { computed, ref } from 'vue';

const favoritesStore = useFavoritesStore();
const {
  email,
  major,
  selectedFavoriteCourses,
  selectedFavoriteProfessors,
  remarks,
} = storeToRefs(favoritesStore);

const showDialog = ref(false);

const activeStep = ref(0);

function isValidEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

async function handleFormSubmission() {
  submitUserCourseMutation();
}

const { isLoading: isSubmitLoading, mutate: submitUserCourseMutation } =
  useMutation(favoritesStore.submitForm);

const isFormValid = computed(() => {
  return isValidEmail(email.value) && selectedFavoriteCourses.value.length > 0;
});

const isStep1Valid = computed(() => {
  return isValidEmail(email.value);
});

const isStep2Valid = computed(() => {
  return major.value.length > 0 && selectedFavoriteProfessors.value.length > 0;
});

const isStep3Valid = computed(() => {
  return selectedFavoriteCourses.value.length > 0;
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
