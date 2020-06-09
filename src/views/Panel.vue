<template>
  <div class="container">
    <div class="columns" v-if="isLoggedIn">
      <div class="column">
        <b-button
          type="is-primary"
          @click="$router.push('/panel/create-activity')"
        >
          Create Activity
        </b-button>
      </div>
      <div class="column">
        <b-button type="is-primary" @click="$router.push('/panel/create-test')">
          Create Quiz
        </b-button>
      </div>
      <div class="column">
        <b-button type="is-primary" @click="$router.push('/panel/create-blog')">
          Create Blog
        </b-button>
      </div>
      <div class="column">
        <b-button type="is-primary" @click="$router.push('/panel/create-meme')">
          Create Meme
        </b-button>
      </div>
    </div>

    <hr />
    <b-modal
      :active.sync="isComponentModalActive"
      has-modal-card
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <Login @loginResult="onLoginResult" />
    </b-modal>
  </div>
</template>

<script>
import Login from "../components/Login";

export default {
  components: {
    Login
  },

  created() {},

  data() {
    return {
      isComponentModalActive: true,
      isLoggedIn: false
    };
  },

  methods: {
    onLoginResult(result) {
      if (result == 200) {
        this.isComponentModalActive = false;
        this.isLoggedIn = true;
      } else {
        this.$buefy.dialog.alert({
          message: "Try again",
          type: "is-danger",
          hasIcon: true,
          icon: "close-octagon",
          ariaModal: true
        });
      }
    }
  }
};
</script>

<style>
</style>