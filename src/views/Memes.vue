<template>
  <div class="container" style="padding: 1rem">
    <div class="columns is-centered is-mobile is-vcentered is-multiline">
      <div class="column has-text-centered is-full is-full-mobile">
        <img :src="meme.image" alt="" style="max-height: 800px" />
      </div>
      <div class="column has-text-centered is-full is-full-mobile" v-if="meme.reactions">
        <b-button
          v-for="(reaction, index) in reactions"
          :key="index"
          :type="{ 'is-primary': reaction.isReacted }"
          @click="giveReaction(index)"
          style="margin: 0.5rem"
        >
          <span v-if="meme.reactions">
            {{ meme.reactions[reactions[index].value] }}
          </span>
          {{ reaction.emoji }}
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
      { emoji: "😂", value: "funny", isReacted: false },
      { emoji: "😔", value: "sad", isReacted: false },
      { emoji: "😎", value: "cool", isReacted: false },
      { emoji: "😡", value: "angry", isReacted: false },
      { emoji: "💩", value: "tard", isReacted: false },
      { emoji: "🧠", value: "brain", isReacted: false },
      { emoji: "❤", value: "heart", isReacted: false }
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
        this.resetReactions();

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

    giveReaction(index) {
      const isReacted = this.reactions[index].isReacted;
      const value = this.reactions[index].value;
      //if already reacted
      let promise;

      if (isReacted) {
        this.$set(this.meme.reactions, value, this.meme.reactions[value] - 1);
        promise = MemeService.GiveReaction(this.meme._id, value, true);
      } else {
        this.$set(this.meme.reactions, value, this.meme.reactions[value] + 1);
        promise = MemeService.GiveReaction(this.meme._id, value);
      }

      promise.then(() => {
        this.$buefy.snackbar.open({
          position: "is-bottom",
          message: "Saved",
          duration: 750
        });
      });

      this.$set(this.reactions[index], "isReacted", !isReacted);
    },

    resetReactions() {
      for (let i = 0; i < this.reactions.length; i++) {
        this.$set(this.reactions[i], "isReacted", false);
      }
    }
  }
};
</script>

<style>
</style>