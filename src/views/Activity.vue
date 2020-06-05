<template>
  <div class="container is-fluid" style="padding: 1rem">
    <b-button
      type="is-success"
      @click="getActivity"
      :disabled="fetching"
      icon-right="dice-6"
      style="margin: 1rem 0rem"
    >
      Another?
    </b-button>

    <div>
      <b-collapse animation="slide" ref="details">
        <div
          slot="trigger"
          slot-scope="props"
          class="card-header"
          role="button"
        >
          <span
            class="is-size-1 is-size-2-mobile has-text-white has-text-weight-bold"
            :class="{ 'has-text-black': !dynamicBackground }"
          >
            {{ sentence }}
          </span>

          <a class="card-header-icon has-text-white">
            <b-icon
              :icon="props.open ? 'chevron-down-circle' : 'chevron-up-circle'"
            >
            </b-icon>
          </a>
        </div>

        <div class="columns is-multiline">
          <div class="column is-half">
            <div style="margin-top:1rem">
              <div class="column is-full">
                <b-button
                  style="margin-top: 1rem"
                  expanded
                  type="is-danger"
                  icon-left="heart"
                  @click="likeActivity"
                ></b-button>
              </div>
              <div class="column is-full">
                <div class="card" v-if="activity.likes">
                  <div class="card-content">
                    Most liked by: {{ mostLikedType }} -
                    {{ activity.likes[mostLikedType] }}
                    <br />
                    Your type liked ({{ $store.state.type }}):
                    {{ activity.likes[$store.state.type] }}
                    <br />
                    Total likes: {{ activity.totalLikes }}
                  </div>
                </div>
              </div>
              <div style="marginTop: 1rem" class="column is-full">
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
          </div>
        </div>
      </b-collapse>
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
    orientation: "",
    mostLikedType: "",
    alreadyLiked: false
  }),

  created() {
    this.orientation = window.screen.orientation.type;
    this.getActivity();
  },

  methods: {
    likeActivity() {
      if (this.alreadyLiked) {
        this.$buefy.dialog.alert({
          message: "You already liked it",
          type: "is-danger",
          hasIcon: true,
          icon: "close-octagon",
          ariaModal: true
        });
        return;
      }

      ActivityService.LikeActivity(this.activity._id, this.type).then(() => {
        this.alreadyLiked = true;
        this.activity.totalLikes++;
        this.$set(
          this.activity.likes,
          [this.type],
          this.activity.likes[this.type] + 1
        );

        if (
          this.activity.likes[this.type] >=
          this.activity.likes[this.mostLikedType]
        ) {
          this.mostLikedType = this.type;
        }
      });
    },

    getActivity() {
      this.alreadyLiked = false;
      this.fetching = true;
      this.activity = {};
      this.relatedModifiers = [];
      this.appliedTypes = [];

      ActivityService.GetRandomActivity().then(activity => {
        this.activity = activity;
        this.relatedModifiers = this.activity.relatedModifiers;
        this.sentence = activity.sentence;
        if (activity.likes != 0) {
          let max = 0;
          const likes = activity.likes;
          for (const key in likes) {
            if (likes[key] > max) {
              max = likes[key];
              this.mostLikedType = key;
            }
          }
        }

        let imgUrl = "";
        // if (process.env.NODE_ENV === "development") {
        //   imgUrl = "http://localhost:3000/api/images/";
        // }
        if (screen.orientation.type === "landscape-primary") {
          imgUrl += activity.landscapeImage;
          this.$store.commit("setBackgroundUrl", imgUrl);
        } else {
          imgUrl += activity.portraitImage;
          this.$store.commit("setBackgroundUrl", imgUrl);
        }
        this.$refs.details.isOpen = false;
        this.fetching = false;
      });
    },

    applyModifier(modifier) {
      this.sentence += " " + modifier.sentence;
      this.appliedTypes.push(modifier.type);
      ModifierService.ApplyModifier(modifier._id).then(() => {
        let filtered = this.relatedModifiers.filter(
          modifier => !this.appliedTypes.includes(modifier.type)
        );

        this.relatedModifiers = filtered;
      });
    },

    handleOrientationChange() {
      this.orientation = window.screen.orientation.type;
    }
  },

  computed: {
    type() {
      return this.$store.state.type;
    },
    dynamicBackground() {
      return this.$store.state.useDynamicBackground;
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