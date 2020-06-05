import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from './router'
import Vue2Editor from "vue2-editor";
import Vuex from 'vuex'
import store from './store/index'

Vue.use(Vue2Editor);
Vue.use(Buefy, { defaultIconPack: 'mdi' });

Vue.config.productionTip = false

console.log(process.env.NODE_ENV);

const types = [
  "ENTP", "ENTJ", "INTJ", "INTP", "ESTP", "ESTJ", "ISTP", "ISTJ", "ISFJ", "ISFP", "ESFP", "ESFJ", "ENFJ", "INFJ", "INFP", "ENFP"
]

if (types.includes(localStorage.type)) {
  store.commit('setType', localStorage.type)
}

new Vue({
  router,
  store,
  Vuex,
  render: h => h(App),
}).$mount('#app')
