<template>
  <v-app>
    <v-content>
      <v-container class="text-center">
        <v-btn
          color="success"
          class="mb-5"
          @click="getExperience"
          :disabled="fetching"
        >
          Random!
        </v-btn>
        <div class="display-2 font-weight-bold">
          {{ sentence }}
        </div>

        <div class="mt-5">
          <v-row justify="center">
            <v-col>
              <v-select
                v-model="selectedActivity"
                :items="allActivities"
                item-text="sentence"
                item-value="_id"
              >
              </v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="selectedPeople"
                :items="allPeople"
                item-text="sentence"
                item-value="_id"
              >
              </v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="selectedPlace"
                :items="allPlace"
                item-text="sentence"
                item-value="_id"
              >
              </v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="selectedTime"
                :items="allTime"
                item-text="sentence"
                item-value="_id"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-btn
            color="success"
            class="mb-4"
            @click="createExperience"
            :disabled="fetching"
          >
            Create
          </v-btn>
        </div>

        <div class="mt-5">
          <p v-for="experience in allExperiences" :key="experience._id">
            {{ experience.sentence }}
          </p>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ExperienceService from "./services/ExperienceService";
import ModifierService from "./services/ModifierService";
import ActivityService from "./services/ActivityService";

export default {
  name: "App",

  data: () => ({
    experience: {},
    fetching: true,
    sentence: "",
    allPlace: [],
    allPeople: [],
    allTime: [],
    allActivities: [],
    allExperiences: [],
    selectedActivity: String,
    selectedPlace: String,
    selectedTime: String,
    selectedPeople: String
  }),

  created() {
    this.getExperience();
    this.getModifiers("People");
    this.getModifiers("Place");
    this.getModifiers("Time");
    this.getAllActivities();
    this.getAllExperiences();
  },

  methods: {
    async getExperience() {
      this.fetching = true;
      ExperienceService.GetRandomExperience().then(experience => {
        this.experience = experience;
        this.sentence = "";
        for (const key in experience) {
          if (typeof experience[key] === "object") {
            this.sentence += experience[key].sentence + " ";
          }
        }
        this.fetching = false;
      });
    },

    async getModifiers(type) {
      this.fetching = true;
      ModifierService.GetModifiers(type).then(modifiers => {
        this.fetching = false;
        this["all" + type] = modifiers;
      });
    },

    async getAllActivities() {
      this.fetching = true;
      ActivityService.GetAllActivities().then(activities => {
        this.fetching = false;
        this.allActivities = activities;
      });
    },

    async getAllExperiences() {
      this.fetching = true;
      await ExperienceService.GetAllExperiences().then(allExperiences => {
        for (let index = 0; index < allExperiences.length; index++) {
          const current = allExperiences[index];
          this.fetching = false;
          current.sentence = generateExperienceSentence(current);
        }
        this.allExperiences = allExperiences;
      });
    },

    async createExperience() {
      ExperienceService.CreateExperience({
        activity: this.selectedActivity,
        people: this.selectedPeople,
        place: this.selectedPlace,
        time: this.selectedTime
      }).then(() => {
        this.getAllExperiences();
      });
    }
  }
};

function generateExperienceSentence(experienceBody) {
  let sentence = "";
  for (const key in experienceBody) {
    if (typeof experienceBody[key] === "object") {
      sentence += experienceBody[key].sentence + " ";
    }
  }
  return sentence;
}
</script>
