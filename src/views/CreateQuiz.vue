<template>
  <div class="container">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <hr />

          <div class="columns">
            <div class="column">
              <b-field label="Quiz Seç" class="has-text-left">
                <b-select
                  placeholder="Select a test"
                  expanded
                  v-model="selectedQuiz"
                >
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
                class="column is-full"
              >
                <Question
                  :results="selectedQuiz.results"
                  :text.sync="question.text"
                  :choices.sync="question.choices"
                  :type.sync="question.type"
                  style="margin: 1rem"
                />
              </div>
            </div>

            <hr />

            <details>
              <summary>Results</summary>
              <div class="columns results">
                <div
                  class="column is-3"
                  v-for="(result, resultIndex) in selectedQuiz.results"
                  :key="resultIndex"
                >
                  <div class="card">
                    <div v-if="result.image">
                      <img :src="result.image" alt="" />
                    </div>
                    <Gallery
                      :resultIndex="resultIndex"
                      @imageSelected="imageSelected"
                    />
                    <div class="card-content">
                      <div class="content">
                        <b-field label="Result Title">
                          <b-input v-model="result.title"> </b-input>
                        </b-field>
                        <b-field label="Result Text">
                          <b-input v-model="result.text" type="textarea">
                          </b-input>
                        </b-field>
                      </div>
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

            <hr />

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
                <b-button
                  type="is-success is-large"
                  icon-left="content-save"
                  @click="createQuiz"
                >
                  <b>Kaydet</b>
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Question from "../components/Question";
import Gallery from "../components/Gallery";
import QuizService from "../services/QuizService";

const defaultQuestion = {
  text: "New Question",
  choices: [{ bg: "black" }]
};

export default {
  components: {
    Question,
    Gallery
  },

  data() {
    return {
      allQuizs: [
        {
          name: "Senin en sevilen özelliğin ne?",
          id: 1,
          questions: [
            {
              text: "Q1",
              choices: []
            }
          ],
          results: []
        }
      ],
      selectedQuiz: {}
    };
  },

  methods: {
    addResult() {
      this.selectedQuiz.results.push({});
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
    },

    imageSelected(fromGallery) {
      const { image, resultIndex } = fromGallery;

      let temp = this.selectedQuiz.results[resultIndex];

      temp.image = image;
      this.$set(this.selectedQuiz.results, resultIndex, temp);
    },

    createQuiz() {
      QuizService.CreateQuiz(this.selectedQuiz).then(res => {
        console.log(res);
      });
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