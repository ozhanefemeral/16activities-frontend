<template>
  <div class="container">
    <b-button
      size="is-large"
      type="is-primary"
      @click="getActivity"
      :disabled="fetching"
      icon-right="dice-6"
    >
    </b-button>
    <section class="hero">
      <div class="hero-body">
        <p class="title is-1 has-text-light">
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
            class="columns is-desktop is-multiline"
            tag="div"
          >
            <div
              v-for="modifier in relatedModifiers"
              :key="modifier._id"
              class="column is-one-quarter list-complete-item"
              @click="applyModifier(modifier)"
            >
              <Modifier :modifier="modifier" />
            </div>
          </transition-group>
        </div>
      </div>
    </section>
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

  data: () => ({
    activity: {},
    fetching: true,
    sentence: "",
    relatedModifiers: [],
    appliedTypes: [],
    appliedKeys: []
  }),

  created() {
    this.getActivity();
  },

  methods: {
    async getActivity() {
      this.fetching = true;
      this.activity = {};
      this.relatedModifiers = [];
      this.appliedTypes = [];
      this.appliedKeys = [];
      ActivityService.GetRandomActivity(screen.orientation.type).then(
        activityResponse => {
          this.activity = activityResponse.activity;
          this.relatedModifiers = this.activity.relatedModifiers;

          let photoPromises = [];

          for (var i = 0; i < this.relatedModifiers.length; i++) {
            photoPromises.push(
              ModifierService.GetModifierPhoto(
                this.relatedModifiers[i]._id,
                screen.orientation.type
              )
            );
          }

          Promise.all(photoPromises).then(values => {
            for (let index = 0; index < values.length; index++) {
              this.$set(
                this.relatedModifiers[index],
                "photo",
                values[index].photo
              );
            }
          });

          // Promise.all(photoPromises).then(photos => {
          //   for (let index = 0; index < photos.length; index++) {
          //     const element = photos[index];
          //     this.relatedModifiers[index].photo = element;
          //   }
          // });

          this.sentence = activityResponse.activity.sentence;
          this.appliedKeys.push(this.activity.keys);
          this.$emit("updateBackground", activityResponse.photo);
          this.fetching = false;
        }
      );
    },

    async applyModifier(modifier) {
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
    }
  }
};
</script>

<style scoped>
.list-complete-item {
  transition: all 1s;
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