<template>
  <div class="container has-text-left">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <p class="is-size-1 has-text-black has-text-weight-bold">Activity</p>

          <div class="columns">
            <div class="column">
              <b-field label="Yeni aktivite">
                <b-input
                  v-model="activitySentence"
                  placeholder="Activity sentence"
                  icon="pencil"
                ></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Mevcut aktivite" v-if="allActivities">
                <b-autocomplete
                  v-model="searchSentence"
                  open-on-focus
                  :data="filteredActivities"
                  field="sentence"
                  @select="option => (selectedActivity = option)"
                >
                </b-autocomplete>
              </b-field>
            </div>
          </div>

          <div style="margin: 1rem 0rem">
            <p class="has-text-weight-semibold">
              Yatay görsel:
              <span class="has-text-success"> {{ landscapeImage }} </span>
            </p>
            <Gallery @imageSelected="onImageSelected" target="landscapeImage" />
          </div>

          <div style="margin: 1rem 0rem">
            <p class="has-text-weight-semibold">
              Dikey görsel:
              <span class="has-text-success"> {{ portraitImage }} </span>
            </p>
            <Gallery @imageSelected="onImageSelected" target="portraitImage" />
          </div>

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
          <b-button @click="saveActivity" type="is-success">Save</b-button>
          <hr />

          <p class="is-size-1 has-text-black has-text-weight-bold">Modifier</p>
          <b-field label="Modifier">
            <b-input v-model="modifierSentence"></b-input>
          </b-field>
          <b-field label="Type">
            <b-select v-model="modifierType">
              <option value="Place">Place</option>
              <option value="Place">Time</option>
              <option value="Place">People</option>
            </b-select>
          </b-field>
          <!-- <div class="columns">
      <div
        class="column is-4"
        v-for="(uniqueImage, index) in uniqueImages"
        :key="index"
      >
        <div class="card">
          <div class="card-content">
            <div class="content">
              <div>
                <b-field label="Aktiviteye özel görsel">
                  <b-autocomplete
                    v-model="searchSentence"
                    open-on-focus
                    :data="filteredActivities"
                    field="sentence"
                    @select="option => (selectedActivity = option)"
                  >
                  </b-autocomplete>
                </b-field>
                <p class="has-text-weight-semibold">
                  Yatay görsel:
                  <span class="has-text-success">
                    {{ uniqueImage.landscapeImage }}
                  </span>
                </p>
                <Gallery
                  @imageSelected="onImageSelected"
                  :target="uniqueImage.landscapeImage"
                />
              </div>

              <div style="margin-top: 1rem">
                <p class="has-text-weight-semibold">
                  Dikey görsel:
                  <span class="has-text-success">
                    {{ uniqueImage.portraitImage }}
                  </span>
                </p>
                <Gallery
                  @imageSelected="onImageSelected"
                  :target="uniqueImage.portraitImage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <b-button
          style="height: 100%"
          @click="
            uniqueImages.push({
              portraitImage: '',
              landscapeImage: ''
            })
          "
          type="is-primary"
        >
          Özel görsel ekle
        </b-button>
      </div>
    </div> -->
          <b-button @click="createModifier" type="is-success">Create</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModifierService from "../services/ModifierService";
import ActivityService from "../services/ActivityService";
import Gallery from "../components/Gallery";
export default {
  components: {
    Gallery
  },

  data: function() {
    return {
      fetching: true,
      keys: [],
      activitySentence: "",
      modifierSentence: "",
      searchSentence: "",
      modifierType: "",
      filteredTags: [],
      landscapeImage: "",
      portraitImage: "",
      isSelectOnly: false,
      relatedModifiers: [],
      uniqueImages: [],
      selectedActivity: "",
      allActivities: [],
      allModifiers: []
    };
  },

  created() {
    this.getAllActivities();
    this.getAllModifiers();
  },

  methods: {
    getAllActivities() {
      this.fetching = true;
      ActivityService.GetAllActivities().then(activities => {
        this.fetching = false;
        this.allActivities = activities;
      });
    },

    getAllModifiers() {
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

    saveActivity() {
      let modifierIDs = [];

      for (let index = 0; index < this.relatedModifiers.length; index++) {
        const element = this.relatedModifiers[index];
        modifierIDs.push(element._id);
      }

      const activityBody = {
        sentence: this.activitySentence,
        relatedModifiers: modifierIDs,
        landscapeImage: this.landscapeImage,
        portraitImage: this.portraitImage
      };

      this.fetching = true;

      if (this.selectedActivity) {
        activityBody._id = this.selectedActivity._id;
        ActivityService.UpdateActivity(activityBody).then(() => {
          this.fetching = false;
          this.showSuccessDialog();
        });
      } else {
        ActivityService.CreateActivity(activityBody).then(() => {
          this.fetching = false;
          this.showSuccessDialog();
        });
      }
    },

    createModifier() {
      this.fetching = true;
      ModifierService.CreateModifier({
        sentence: this.modifierSentence,
        type: this.modifierType,
        landscapeImage: this.modifierLandscapeImageName,
        portraitImage: this.modifierPortraitImageName
      }).then(modifier => {
        this.fetching = false;
        this.allModifiers.push(modifier);
        this.showSuccessDialog();
      });
    },

    showSuccessDialog() {
      this.$buefy.dialog.alert({
        message: "Done",
        hasIcon: true,
        type: "is-success",
        icon: "check-circle",
        confirmText: "Cool!"
      });
    },

    onImageSelected(image, target) {
      console.log(target);

      this[target] = image;
    },

    addQuestion() {
      this.selectedTest.questions.push({});
    },

    deleteActivity() {}
  },

  computed: {
    filteredActivities() {
      if (this.allActivities.length == 0) {
        return;
      }
      return this.allActivities.filter(activity => {
        return (
          activity.sentence
            .toString()
            .toLowerCase()
            .indexOf(this.searchSentence.toLowerCase()) >= 0
        );
      });
    }
  },

  watch: {
    selectedActivity: function() {
      let selectedActivity = this.selectedActivity;

      if (!selectedActivity) {
        this.activitySentence = "";
        this.portraitImage = "";
        this.landscapeImage = "";
        this.relatedModifiers = [];
        return;
      }

      this.activitySentence = selectedActivity.sentence;
      this.portraitImage = selectedActivity.portraitImage;
      this.landscapeImage = selectedActivity.landscapeImage;
      this.relatedModifiers = selectedActivity.relatedModifiers;
    }
  }
};
</script>

<style>
</style>