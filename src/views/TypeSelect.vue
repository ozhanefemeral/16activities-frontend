<template>
  <div class="container">
    <center>
      <b-carousel
        @change="onTypeChange"
        :autoplay="autoplay"
        icon-prev="chevron-left"
        icon-next="chevron-right"
      >
        <b-carousel-item v-for="(type, index) in types" :key="index">
          <center>
            <div class="content">
              <p
                class="is-size-1 has-text-primary has-text-weight-bold"
                style="margin:-1rem"
              >
                {{ type }}
              </p>
            </div>

            <img
              width="80%"
              style="max-width:400px;"
              :src="require(`@/assets/${type}.svg`)"
            />
          </center>
          <!-- <img src="../assets/ENTP.svg" width="80%" style="max-width: 400px" /> -->
        </b-carousel-item>
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
      types: ["INFJ", "ENTP", "ISFP", "INFP", "ESFP"],
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
        cancelText: "no, I am a ninja 🐱‍👤",
        confirmText: "yes, please 🤴",
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