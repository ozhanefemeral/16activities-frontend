import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        type: '',
        useDynamicBackground: true,
        backgroundUrl: ''
    },
    mutations: {
        setType(state, newType) {
            state.type = newType
        },

        setUseDynamicBackground(state, newValue) {
            state.useDynamicBackground = newValue;
        },

        setBackgroundUrl(state, newUrl) {
            state.backgroundUrl = newUrl
        }
    }
})

export default store