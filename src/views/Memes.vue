<template>
  <div class="container" style="padding: 1rem">
    <div class="columns is-centered is-mobile is-vcentered is-multiline">
      <div class="column has-text-centered is-full is-full-mobile">
        <img :src="meme.image" alt="" style="max-height: 800px" />
      </div>
      <div class="column has-text-centered is-full is-full-mobile">
        <b-button v-for="(reaction, index) in reactions" :key="index" @click="giveReaction(index)">
          {{ reaction }}
        </b-button>
      </div>
      <div class="column is-narrow">
        <b-field>
          <b-select multiple v-model="selectedTypes">
            <option v-for="(type, index) in types" :key="index" :value="type">
              {{ type }}
            </option>
          </b-select>
        </b-field>
      </div>
      <div class="column is-narrow">
        <b-checkbox v-model="nsfw">NSFW?</b-checkbox>
      </div>
      <div class="column is-narrow">
        <b-button
          type="is-success"
          size="is-medium"
          @click="getMeme"
          icon-right="dice-6"
          style="margin: 1rem 0rem"
        >
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import MemeService from "../services/MemeService";

export default {
  data: () => ({
    meme: {},
    selectedTypes: [],
    reactions: [
      '😂',
      '😔',
      '😎',
      '😡',
      '💩',
      '🧠',
      '❤',
    ],
    nsfw: false,
    types: [
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
    ]
  }),
  methods: {
    getMeme() {
      this.alreadyLiked = false;
      this.fetching = true;
      this.meme = {};

      MemeService.GetRandomMeme(this.selectedTypes, this.nsfw).then(meme => {
        if (process.env.NODE_ENV === "development") {
          meme.image = "http://192.168.1.27:8080/api/memes/" + meme.image;
        } else {
          meme.image = "/api/images/" + meme.image;
        }
        this.meme = meme;

        if (meme.likes != 0) {
          let max = 0;
          const likes = meme.likes;
          for (const key in likes) {
            if (likes[key] > max) {
              max = likes[key];
              this.mostLikedType = key;
            }
          }
        }

        this.fetching = false;
      });
    },

    giveReaction(index){
      console.log(this.reactions[index]);
    }
  }
};
</script>

<style>
</style>