<template>
  <div class="container">
    <section>
      <b-field label="Types">
        <b-taginput
          v-model="selectedTypes"
          :data="filteredTypes"
          autocomplete
          icon="label"
          @typing="getFilteredTypes"
        >
        </b-taginput>
      </b-field>
      <div class="field">
        <b-checkbox v-model="nsfw">NSFW?</b-checkbox>
      </div>
      <p class="content"><b>Types:</b> {{ selectedTypes }}</p>
      <b-field>
        <b-upload v-model="dropFiles" multiple drag-drop>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" size="is-large"> </b-icon>
              </p>
              <p>Drop your files here or click to upload</p>
            </div>
          </section>
        </b-upload>
      </b-field>

      <div class="tags">
        <span
          v-for="(file, index) in dropFiles"
          :key="index"
          class="tag is-primary"
        >
          {{ file.name }}
          <button
            class="delete is-small"
            type="button"
            @click="deleteDropFile(index)"
          ></button>
        </span>
      </div>

      <b-button @click="uploadMemes" type="is-primary">Upload</b-button>
    </section>
  </div>
</template>

<script>
import MemeService from "../services/MemeService";

const types = [
  "Everyone",
  "ENTP",
  "INTP",
  "INTJ",
  "ENTJ",
  "ESTJ",
  "ESFJ",
  "ISFJ",
  "ISTJ",
  "ENFJ",
  "INFJ",
  "ENFP",
  "INFP",
  "ESFP",
  "ISFP",
  "ESTP",
  "ISTP"
];
export default {
  data() {
    return {
      dropFiles: [],
      filteredTypes: types,
      selectedTypes: [],
      nsfw: false
    };
  },
  methods: {
    uploadMemes() {
      let memeBody = {
        forTypes: this.selectedTypes,
        nsfw: this.nsfw
      };
      MemeService.UploadMemes(this.dropFiles, memeBody).then(() => {
        this.$buefy.dialog.alert({
          message: "Done",
          hasIcon: true,
          type: "is-success",
          icon: "check-circle",
          confirmText: "Cool!"
        });
      });
    },

    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },

    getFilteredTypes(text) {
      this.filteredTypes = types.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    }
  }
};
</script>