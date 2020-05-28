<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <b-field label="Question Text" class="has-text-left">
          <b-input v-model="computedText" size="is-large"> </b-input>
        </b-field>

        <div class="is-centered">
          <b-field label="Choices" class="has-text-left">
            <div class="columns is-multiline is-centered  is-mobile">
              <div
                class="column is-half"
                v-for="(choice, choiceIndex) in choices"
                :key="choiceIndex"
              >
                <div class="card">
                  <div
                    class="choice"
                    :style="{ 'background-color': choice.bg }"
                  >
                    <div
                      class="editable"
                      contenteditable
                      @input="handleInput(e)"
                    >
                      {{ choice.text }}
                    </div>
                  </div>
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
                    <b-button
                      type="is-danger"
                      icon-right="delete"
                      style="margin:8px;"
                      @click="deleteChoice(choiceIndex)"
                    />
                  </div>
                </div>
              </div>
              <div class="column">
                <b-button type="is-primary" class="plus" @click="addChoice">
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
export default {
  props: {
    text: { type: String, required: true },
    choices: { type: Array, required: true }
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
      ]
    };
  },

  methods: {
    handleInput: function(e) {
      this.content = e.target.innerHTML;
    },

    addChoice: function() {
      const random = Math.round(Math.random() * this.colors.length);
      this.choices.push({
        bg: this.colors[random]
      });
    },

    changeColor(index, color) {
      let temp = this.choices[index];
      temp.bg = color;

      this.$set(this.choices, index, temp);
    },

    deleteChoice(index) {
      this.choices.splice(index, 1);
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
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
  width: 10rem;
}

.editable {
  width: 90%;
  font-size: 3rem;
  text-align: center;
  word-wrap: break-word;
  white-space: normal;
  font-weight: bold;
}
</style>