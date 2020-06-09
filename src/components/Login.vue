<template>
  <form>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
      </header>
      <section class="modal-card-body">
        <b-field label="id">
          <b-input v-model="id" placeholder="Your ID" required>
          </b-input>
        </b-field>

        <b-field label="Password">
          <b-input
            type="password"
            v-model="password"
            password-reveal
            placeholder="Your password"
            required
          >
          </b-input>
        </b-field>

        <b-checkbox>Remember me</b-checkbox>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Close
        </button>
        <button class="button is-primary" @click="login">Login</button>
      </footer>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  props: ["id", "password"],

  methods: {
    login() {
      axios
        .post("/api/login/", {
          id: this.id,
          password: this.password
        })
        .then(res => {
          this.$emit("loginResult", res.status);
        })
        .catch(res => {
          this.$emit("loginResult", res.status);
        });
    }
  },
};
</script>

<style>
</style>