import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ledsObject: {},
        rgb_red: 0,
        rgb_green: 0,
        rgb_blue: 0,
    },
    mutations: {
        setleds: function (state, ledsObject) {
            state.ledsObject = ledsObject;
            localStorage.setItem("ledsObject",JSON.stringify(ledsObject));
        },
        set_rgb_red:  function (state, rgb_red) {
            state.rgb_red = rgb_red;
            localStorage.setItem("rgb_red",rgb_red);
        },
        set_rgb_green:  function (state, rgb_green) {
            state.rgb_green = rgb_green;
            localStorage.setItem("rgb_green",rgb_green);
        },
        set_rgb_blue:  function (state, rgb_blue) {
            state.rgb_blue = rgb_blue;
            localStorage.setItem("rgb_blue",rgb_blue);
        },
    }
})