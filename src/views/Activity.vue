<template>
  <div class="container is-fluid" style="padding: 1rem">
    <b-button
      size="is-large"
      type="is-success"
      @click="getActivity"
      :disabled="fetching"
      icon-right="dice-6"
      style="margin-bottom:2rem"
    >
    </b-button>

    <p class="title is-1 has-text-white">
      {{ sentence }}
    </p>

    <hr />
    <i>
      <p class="is-6 has-text-italic has-text-grey-lighter">
        Recommended with...
      </p>
    </i>

    <div style="marginTop: 1rem">
      <transition-group
        name="list-complete"
        class="columns is-multiline is-mobile"
        tag="div"
      >
        <div
          v-for="modifier in relatedModifiers"
          :key="modifier._id"
          class="list-complete-item column is-one-quarter-tablet is-half-mobile"
          @click="applyModifier(modifier)"
        >
          <Modifier :modifier="modifier" :orientation="orientation" />
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import ActivityService from "../services/ActivityService";
import ModifierService from "../services/ModifierService";
import Modifier from "../components/Modifier";

export default {
  name: "Activity",

  components: {
    Modifier
  },

  mounted() {
    window.addEventListener("orientationchange", this.handleOrientationChange);
  },

  data: () => ({
    activity: {},
    fetching: true,
    sentence: "",
    relatedModifiers: [],
    appliedTypes: [],
    appliedKeys: [],
    orientation: ""
  }),

  created() {
    this.orientation = window.screen.orientation.type;
    this.getActivity();
  },

  methods: {
    getActivity() {
      this.fetching = true;
      this.activity = {};
      this.relatedModifiers = [];
      this.appliedTypes = [];
      this.appliedKeys = [];
      ActivityService.GetRandomActivity().then(activity => {
        this.activity = activity;
        this.relatedModifiers = this.activity.relatedModifiers;
        this.sentence = activity.sentence;
        this.appliedKeys.push(this.activity.keys);

        let imgUrl = "";
        if (process.env.NODE_ENV === "development") {
          let imgUrl = "http://localhost:3000/uploads/";
        }
        if (screen.orientation.type === "landscape-primary") {
          this.$emit("updateBackground", imgUrl + activity.landscapeImage);
        } else if (screen.orientation.type === "portrait-primary") {
          this.$emit("updateBackground", imgUrl + activity.portraitImage);
        }
        this.fetching = false;
      });
    },

    applyModifier(modifier) {
      this.sentence += " " + modifier.sentence;
      this.appliedTypes.push(modifier.type);
      this.appliedKeys.push(modifier.keys);
      ModifierService.ApplyModifier(
        this.appliedKeys.join(" "),
        modifier._id,
        screen.orientation.type
      ).then(modifier => {
        let filtered = this.relatedModifiers.filter(
          modifier => !this.appliedTypes.includes(modifier.type)
        );

        this.relatedModifiers = filtered;

        this.$emit("updateBackground", modifier.photo);
      });
    },

    handleOrientationChange() {
      this.orientation = window.screen.orientation.type;
    }
  }
};
</script>

<style scoped>
.list-complete-item {
  transition: all 0.75s;
  opacity: 0.2;
}

.list-complete-item:hover {
  opacity: 1;
}

.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>