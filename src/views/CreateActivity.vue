<template>
  <div class="container has-text-left">
    <p class="is-size-1 has-text-white has-text-weight-bold">Activity</p>
    <b-field label="Aktivite">
      <b-input
        v-model="activitySentence"
        placeholder="Activity sentence"
        icon="pencil"
      ></b-input>
    </b-field>
    <b-field label="Görsel Anahtar Kelimeleri">
      <b-taginput
        v-model="keys"
        ellipsis
        icon="image"
        placeholder="Add keys for image"
      >
      </b-taginput>
    </b-field>
    <b-field label="Alakalı Tamamlayıcılar">
      <b-taginput
        v-model="relatedModifiers"
        :data="filteredTags"
        autocomplete
        icon="label"
        field="sentence"
        placeholder="Add modifiers"
        @typing="getFilteredTags"
      >
      </b-taginput>
    </b-field>
    <hr />
    <b-button @click="CreateActivity" type="success">Create</b-button>
  </div>
</template>

<script>
import ModifierService from "../services/ModifierService";
import ActivityService from "../services/ActivityService";

export default {
  data: function() {
    return {
      fetching: true,
      keys: [],
      activitySentence: "",
      filteredTags: [],
      isSelectOnly: false,
      relatedModifiers: [],
      selectedActivity: "",
      allActivities: [],
      allModifiers: []
    };
  },

  created() {
    this.GetAllActivities();
    this.GetAllModifiers();
  },

  methods: {
    async GetAllActivities() {
      this.fetching = true;
      ActivityService.GetAllActivities().then(activities => {
        this.fetching = false;
        this.allActivities = activities;
      });
    },

    async GetAllModifiers() {
      this.fetching = true;
      ModifierService.GetAllModifiers().then(modifiers => {
        this.allModifiers = modifiers;
        this.fetching = false;
      });
    },

    getFilteredTags(text) {
      this.filteredTags = this.allModifiers.filter(option => {
        return (
          option.sentence
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    },

    async CreateActivity() {
      let modifierIDs = [];

      for (let index = 0; index < this.relatedModifiers.length; index++) {
        const element = this.relatedModifiers[index];
        modifierIDs.push(element._id);
      }

      const activityBody = {
        sentence: this.activitySentence,
        relatedModifiers: modifierIDs,
        keys: this.keys
      };

      this.fetching = true;
      ActivityService.CreateActivity(activityBody).then(() => {
        this.fetching = false;
      });
    },

    addQuestion() {
      this.selectedTest.questions.push({});
    }
  }
};
</script>

<style>
</style>