<template>
  <q-page class="q-pt-md">
    <q-form @submit.prevent="submitForm" class="column items-center q-pa-sm">
      <q-card flat class="max-width-card q-mb-lg q-pa-sm q-py-lg">
        <q-card-section>
          <div class="text-h4 text-weight-light q-mb-md">
            What are your favorite courses at Yale?
          </div>
          <div class="text-subtitle1 text-weight-light">
            As we wrap up the school year, let's reflect on the courses that
            defined our college careers. Please share your favorite courses. I
            wish I could use a Google Form but there are too many courses to
            list, so this form uses custom rendering.
          </div>
        </q-card-section>
      </q-card>

      <q-card flat class="max-width-card q-mb-lg q-pa-sm">
        <q-card-section>
          <div class="text-h6 text-weight-light q-mb-md">
            What courses have been your
            <span class="text-weight-bold"> best </span> courses at Yale?
          </div>
          <SelectCourses />
        </q-card-section>
      </q-card>
      <q-card flat class="max-width-card q-mb-lg q-pa-sm">
        <q-card-section>
          <div class="text-h6 text-weight-light q-mb-md">
            What courses have been your
            <span class="text-weight-bold">worst</span> courses at Yale?
          </div>
          <SelectCourses />
        </q-card-section>
      </q-card>

      <q-card flat class="max-width-card q-mb-lg q-pa-sm">
        <q-card-section>
          <div class="text-h6 text-weight-light q-mb-md">
            Who have been your
            <span class="text-weight-bold"> favorite </span> professors at Yale?
          </div>
          <q-input
            filled
            label="Favorite Professors"
            v-model="favoriteProfessors"
            hint="Enter a comma-separated list of professor first and last names "
          />
        </q-card-section>
      </q-card>

      <q-card flat class="max-width-card q-mb-lg q-pa-sm">
        <q-card-section>
          <div class="text-h6 text-weight-light q-mb-md">
            Any remarks or words to defend your choices?
          </div>
          <q-input filled v-model="remarks" />
        </q-card-section>
      </q-card>

      <q-card flat class="max-width-card q-mb-lg">
        <q-btn
          :color="isFormValid ? 'primary' : 'dark'"
          label="Submit"
          type="submit"
          @click="showDialog = true"
          :disable="!isFormValid"
          class="full-width"
        />
      </q-card>
    </q-form>

    <q-dialog v-model="showDialog" persistent>
      <q-card class="max-width-card" flat>
        <q-card-section>
          <div class="text-h6">Please enter your email and major</div>
          <div class="q-mt-md">
            <q-input
              filled
              label="Email"
              v-model="email"
              :rules="[
                (val) => isValidEmail(val) || 'Please enter a valid email',
              ]"
            />
          </div>
          <div class="q-mt-md">
            <q-select
              v-model="major"
              label="Major(s)"
              :options="majors"
              multiple
              clearable
              use-chips
              filled
            />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Submit Anyway" @click="submitForm" />
          <q-btn
            label="Submit"
            color="primary"
            v-close-popup
            :disable="!isValidEmail(email)"
            @click="submitForm"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
import { supabase } from 'src/supabase';
import { getDisplayText } from 'src/utils/getDisplayText';
import { computed, ref } from 'vue';

const favoritesStore = useFavoritesStore();
const showDialog = ref(false);

const email = ref('');
const remarks = ref('');
const major = ref([]);
const favoriteProfessors = ref('');
const majors = [
  'African American Studies (B.A.)',
  'African Studies (B.A.)',
  'American Studies (B.A.)',
  'Anthropology (B.A.)',
  'Applied Mathematics (B.A. or B.S.)',
  'Applied Physics (B.S.)',
  'Archaeological Studies (B.A.)',
  'Architecture (B.A.)',
  'Art (B.A.)',
  'Astronomy (B.A.)',
  'Astrophysics (B.S.)',
  'Biomedical Engineering (B.S.)',
  'Chemical Engineering (B.S.)',
  'Chemistry (B.A. or B.S.)',
  'Classical Civilization (B.A.)',
  'Classics (B.A.)',
  'Cognitive Science (B.A. or B.S.)',
  'Comparative Literature (B.A.)',
  'Computer Science (B.A. or B.S.)',
  'Computer Science and Economics (B.S.)',
  'Computer Science and Mathematics (B.S.)',
  'Computer Science and Psychology (B.A.)',
  'Computing and Linguistics (B.A. or B.S.)',
  'Computing and the Arts (B.A.)',
  'Earth and Planetary Sciences (B.A. or B.S.)',
  'East Asian Languages and Literatures (B.A.)',
  'East Asian Studies (B.A.)',
  'Ecology and Evolutionary Biology (B.A. or B.S.)',
  'Economics (B.A.)',
  'Economics and Mathematics (B.A.)',
  'Electrical Engineering (B.S.)',
  'Electrical Engineering and Computer Science (B.S.)',
  'Engineering Sciences (Chemical) (B.S.)',
  'Engineering Sciences (Electrical) (B.A. or B.S.)',
  'Engineering Sciences (Environmental) (B.A.)',
  'Engineering Sciences (Mechanical) (B.A. or B.S.)',
  'English (B.A.)',
  'Environmental Engineering (B.S.)',
  'Environmental Studies (B.A. or B.S.)',
  'Ethics, Politics, and Economics (B.A.)',
  'Ethnicity, Race, and Migration (B.A.)',
  'Film and Media Studies (B.A.)',
  'French (B.A.)',
  'German Studies (B.A.)',
  'Global Affairs (B.A.)',
  'Greek, Ancient and Modern (B.A.)',
  'History (B.A.)',
  'History of Art (B.A.)',
  'History of Science, Medicine, and Public Health (B.A.)',
  'Humanities (B.A.)',
  'Italian Studies (B.A.)',
  'Judaic Studies (B.A.)',
  'Latin American Studies (B.A.)',
  'Linguistics (B.A.)',
  'Mathematics (B.A. or B.S.)',
  'Mathematics and Philosophy (B.A.)',
  'Mathematics and Physics (B.S.)',
  'Mechanical Engineering (B.S.)',
  'Modern Middle East Studies (B.A.)',
  'Molecular Biophysics and Biochemistry (B.A. or B.S.)',
  'Molecular, Cellular, and Developmental Biology (B.A. or B.S.)',
  'Music (B.A.)',
  'Near Eastern Languages and Civilizations (B.A.)',
  'Neuroscience (B.A. or B.S.)',
  'Philosophy (B.A.)',
  'Physics (B.S.)',
  'Physics and Geosciences (B.S.)',
  'Physics and Philosophy (B.A. or B.S.)',
  'Political Science (B.A.)',
  'Portuguese (B.A.)',
  'Psychology (B.A. or B.S.)',
  'Religious Studies (B.A.)',
  'Russian (B.A.)',
  'Russian, East European, and Eurasian Studies (B.A.)',
  'Sociology (B.A.)',
  'South Asian Studies (second major only)',
  'Spanish (B.A.)',
  'Special Divisional Major (B.A. or B.S.)',
  'Statistics and Data Science (B.A. or B.S.)',
  'Theater and Performance Studies (B.A.)',
  'Urban Studies (B.A.)',
  'Women’s, Gender, and Sexuality Studies (B.A.)',
  'Other',
];

function isValidEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

async function submitForm() {
  const { error } = await supabase.from('UserCourse').insert({
    email: email.value,
    selected_courses: favoritesStore.selectedCourses,
    remarks: remarks.value,
    favorite_courses: favoritesStore.selectedCourses
      .map((course) => getDisplayText(course))
      .join(';'),
  });
}

const isFormValid = computed(() => {
  return favoritesStore.selectedCourses.length > 0;
});
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
