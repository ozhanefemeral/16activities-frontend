<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <b-field label="Question Text" class="has-text-left">
          <b-input v-model="computedText" size="is-large"> </b-input>
        </b-field>

        <div class="is-centered">
          <b-field label="Choices" class="has-text-left">
            <div class="columns is-multiline is-mobile">
              <div
                class="column is-half"
                v-for="(choice, choiceIndex) in choices"
                :key="choiceIndex"
              >
                <div class="card">
                  <div class="choice">
                    <img
                      v-if="choice.image"
                      :src="choice.image"
                      style="width: 100%; height: 100%"
                    />
                    <div
                      :style="{
                        'background-color': choice.bg
                      }"
                      class="editable"
                      v-else
                    >
                      <h1 :id="'choice' + choiceIndex">
                        {{ choice.text }}
                      </h1>
                    </div>
                  </div>
                  <b-field label="Text (optional)">
                    <b-input v-model="choice.text"></b-input>
                  </b-field>
                  <details>
                    <summary>Edit</summary>
                    <div
                      style="display: flex; justify-content: space-evenly, align-items: center; flex-wrap: wrap"
                    >
                      <b-button
                        v-for="(color, index) in colors"
                        :key="index"
                        @click="changeColor(choiceIndex, color)"
                        :style="{ 'background-color': color }"
                        style="margin:8px; padding: 1rem"
                      />
                      <Gallery
                        @imageSelected="imageSelected"
                        :choiceIndex="choiceIndex"
                      />
                      <b-button
                        type="is-danger"
                        icon-right="delete"
                        style="margin:8px;"
                        @click="deleteChoice(choiceIndex)"
                      />
                    </div>
                  </details>
                  <details>
                    <summary>Etkiler</summary>
                    <div class="columns">
                      <div class="column is-full">
                        <div
                          class="columns is-multiline"
                          v-for="(result, resultIndex) in results"
                          :key="resultIndex"
                        >
                          <div class="column is-5">{{ result.title }}</div>
                          <div class="column is-5">
                            <b-input
                              v-model="choice.results[resultIndex]"
                            ></b-input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
              <div class="column is-half">
                <b-button
                  type="is-primary"
                  class="plus"
                  @click="addChoice"
                  style="height: 20rem; width: 20rem"
                >
                  <b>+ Seçim Ekle</b>
                </b-button>
              </div>
            </div>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Gallery from "../components/Gallery";

export default {
  components: {
    Gallery
  },

  props: {
    text: { type: String, required: true },
    choices: { type: Array },
    results: { type: Array }
  },

  data() {
    return {
      colors: [
        "red",
        "blue",
        "black",
        "yellow",
        "green",
        "purple",
        "pink",
        "orange"
      ],
      questionImage: ""
    };
  },

  methods: {
    handleInput: function(e) {
      this.content = e.target.innerHTML;
    },

    addChoice() {
      const random = Math.round(Math.random() * this.colors.length);

      this.choices.push({
        bg: this.colors[random],
        results: new Array(this.results.length)
      });
    },

    changeColor(choiceIndex, color) {
      let temp = this.choices[choiceIndex];
      temp.bg = color;
      delete temp.image;

      this.$set(this.choices, choiceIndex, temp);
    },

    deleteChoice(index) {
      this.choices.splice(index, 1);
    },

    imageSelected(fromGallery) {
      const { choiceIndex, image } = fromGallery;
      let temp = this.choices[choiceIndex];
      delete temp.bg;
      temp.image = image;
      this.$set(this.choices, choiceIndex, temp);
    }
  },

  computed: {
    computedText: {
      get() {
        return this.text;
      },
      set(input) {
        this.$emit("update:text", input);
        return input;
      }
    }
  }
};
</script>

<style>
.choice {
  height: 20rem;
  width: 20rem;
}

.editable {
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 90%;
  height: 100%;
  text-align: center;
  font-weight: bold;
  word-wrap: break-word;
}

.editable h1 {
  color: white;
  font-size: 2rem;
}
</style>