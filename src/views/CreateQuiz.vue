<template>
  <div class="container">
    <hr />

    <div class="columns">
      <div class="column">
        <b-field label="Quiz Seç" class="has-text-left">
          <b-select placeholder="Select a test" expanded v-model="selectedQuiz">
            <option
              v-for="(test, index) in allQuizs"
              :value="test"
              :key="index"
            >
              {{ test.name }}
            </option>
          </b-select>
        </b-field>
      </div>
      <div class="column">
        <b-button
          type="is-primary"
          @click="newQuiz"
          expanded
          style="height: 100%"
        >
          <b>
            + Yeni Quiz
          </b>
        </b-button>
      </div>
    </div>

    <div v-if="selectedQuiz.id">
      <hr />

      <b-field label="Quiz Name" class="has-text-left">
        <b-input v-model="selectedQuiz.name" size="is-large"></b-input>
      </b-field>

      <hr />

      <div class="columns is-multiline">
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="column is-half"
        >
          <Question
            :text.sync="question.text"
            :choices.sync="question.choices"
            :type.sync="question.type"
            style="margin: 1rem"
          />
        </div>
      </div>

      <div class="columns">
        <div class="column is-2">
          <b-button
            @click="addQuestion"
            :disabled="!selectedQuiz.questions"
            type="is-primary is-large"
          >
            <b>+ Soru Ekle</b>
          </b-button>
        </div>
        <div class="column is-2">
          <b-button type="is-success is-large" icon-left="content-save">
            <b>Kaydet</b>
          </b-button>
        </div>
      </div>

      <hr />

      <details v-if="selectedQuiz.results">
        <summary>Results</summary>
        <div class="columns results">
          <div
            class="column is-3"
            v-for="(result, index) in selectedQuiz.results"
            :key="index"
          >
            <div class="card">
              <div class="card-image">
                <b-collapse :open="false" aria-id="contentIdForA11y1">
                  <img
                    class="image is-256x256"
                    :src="result.imgUrl"
                    alt="Placeholder image"
                    slot="trigger"
                    aria-controls="contentIdForA11y1"
                  />
                  <div class="content">
                    <b-field label="Result Title">
                      <b-input v-model="result.title"> </b-input>
                    </b-field>
                    <b-field label="Result Description">
                      <b-input type="textarea" v-model="result.text"> </b-input>
                    </b-field>
                    <b-button
                      type="is-danger"
                      icon-left="delete"
                      @click="removeResult(index)"
                      >Remove</b-button
                    >
                  </div>
                </b-collapse>
              </div>
            </div>
          </div>

          <div class="column is-1">
            <b-button
              expanded
              type="is-primary"
              class="plus"
              @click="addResult"
            >
              +
            </b-button>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<script>
import Question from "../components/Question";

const defaultQuestion = {
  text: "New Question",
  choices: [{ text: "Choice", bg: "black" }]
};

export default {
  components: {
    Question
  },

  data() {
    return {
      allQuizs: [
        {
          name: "Hangi Harry Potter karakterisin?",
          id: 1,
          questions: [
            {
              text: "Q1",
              type: "expanded",
              choices: [{ text: "C1" }]
            },
            {
              text: "Q2",
              type: "list",
              choices: [{ text: "C1" }]
            }
          ],
          results: [
            {
              title: "Dumbledore",
              text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              imgUrl:
                "https://pbs.twimg.com/profile_images/1027825808788873217/pQQ2WvKl_400x400.jpg"
            }
          ]
        }
      ],
      selectedQuiz: {}
    };
  },

  methods: {
    addResult() {
      this.selectedQuiz.results.push({
        imgUrl: "https://picsum.photos/1024"
      });
    },

    removeResult(index) {
      console.log(index);
      this.selectedQuiz.results.splice(index, 1);
    },

    addQuestion() {
      this.selectedQuiz.questions.push(defaultQuestion);
    },

    newQuiz() {
      const length = this.allQuizs.length;

      this.allQuizs.push({
        id: length,
        name: "Quiz " + (length + 1),
        questions: [defaultQuestion]
      });

      this.selectedQuiz = this.allQuizs[length];
    }
  },

  computed: {
    questions() {
      return this.selectedQuiz.questions;
    }
  }
};
</script>

<style>
.results {
  overflow: scroll;
}
</style>