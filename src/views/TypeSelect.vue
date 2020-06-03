<template>
  <div class="container">
    <center>
      <b-carousel
        @change="onTypeChange"
        :autoplay="autoplay"
        icon-prev="chevron-left"
        icon-next="chevron-right"
      >
        <b-carousel-item>
          <img
            width="80%"
            style="max-width:400px"
            src="../assets/person-1.svg"
          />
        </b-carousel-item>
        <b-carousel-item>
          <img
            width="80%"
            style="max-width:400px"
            src="../assets/person-2.svg"
          />
        </b-carousel-item>
        <b-carousel-item>
          <img
            width="80%"
            style="max-width:400px"
            src="../assets/person-3.svg"
          />
        </b-carousel-item>
        <!-- <b-carousel-item v-for="n in 16" :key="n">
        <img
          width="80%"
          style="max-width:400px"
          :src="'../assets/person-' + n + '.svg'"
        />
      </b-carousel-item> -->
      </b-carousel>

      <b-button
        size="is-large"
        type="is-primary"
        style="margin-top: 2rem"
        @click="pickType"
      >
        Thats me! 🤩
      </b-button>
    </center>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoplay: false,
      types: ["INFJ", "ESFP", "INFP"],
      currentType: "INFJ"
    };
  },
  methods: {
    onTypeChange(i) {
      this.currentType = this.types[i];
    },

    pickType() {
      this.$store.commit("setType", this.currentType);
      this.$buefy.dialog.confirm({
        message: "Should we remember you next time?",
        cancelText: 'no, I am a ninja 🐱‍👤',
        confirmText: 'yes, please 🤴',
        onConfirm: () => {
          localStorage.type = this.currentType;
          this.$router.push("activities");
        },
        onCancel: () => {
          this.$router.push("activities");
        }
      });
    }
  }
};
</script>

<style>
</style>