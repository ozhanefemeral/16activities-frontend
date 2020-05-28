import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from './router'
import Vue2Editor from "vue2-editor";

Vue.use(Vue2Editor);
Vue.use(Buefy, { defaultIconPack: 'mdi' });

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
