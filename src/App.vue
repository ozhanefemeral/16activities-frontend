<template>
  <div>
    <Navbar /> 
    <div class="container">
      <center>
        <b-button
          size="is-large"
          type="is-primary"
          @click="getExperience"
          :disabled="fetching"
          icon-right="dice-6"
        >
          Random!
        </b-button>
        <section class="hero">
          <div class="hero-body">
            <div class="container">
              <h1 class="title is-size-1">
                {{ sentence }}
              </h1>
            </div>
          </div>
        </section>

        <div class="columns">
          <div class="column is-one-quarter">
            <b-select
              expanded
              placeholder="Activity"
              v-model="selectedActivity"
            >
              <option
                v-for="(activity, i) in allActivities"
                :value="activity._id"
                :key="i"
              >
                {{ activity.sentence }}
              </option>
            </b-select>
          </div>
          <div class="column is-one-quarter">
            <b-select expanded placeholder="People" v-model="selectedPeople">
              <option
                v-for="(people, i) in allPeople"
                :value="people._id"
                :key="i"
              >
                {{ people.sentence }}
              </option>
            </b-select>
          </div>
          <div class="column is-one-quarter">
            <b-select expanded placeholder="Place" v-model="selectedPlace">
              <option
                v-for="(place, i) in allPlace"
                :value="place._id"
                :key="i"
              >
                {{ place.sentence }}
              </option>
            </b-select>
          </div>
          <div class="column is-one-quarter">
            <b-select expanded placeholder="Time" v-model="selectedTime">
              <option v-for="(time, i) in allTime" :value="time._id" :key="i">
                {{ time.sentence }}
              </option>
            </b-select>
          </div>
        </div>
        <b-button
          type="is-success"
          icon-right="plus-thick"
          @click="createExperience"
          :disabled="fetching"
        >
          Create
        </b-button>

        <div class="mt-5">
          <p v-for="experience in allExperiences" :key="experience._id">
            {{ experience.sentence }}
          </p>
        </div>
      </center>
    </div>
  </div>
</template>

<script>
import ExperienceService from "./services/ExperienceService";
import ModifierService from "./services/ModifierService";
import ActivityService from "./services/ActivityService";
import Navbar from "./components/Navbar";

export default {
  name: "App",

  components: {
    Navbar
  },

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
