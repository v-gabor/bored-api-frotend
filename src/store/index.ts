import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import { articleModule } from "@/store/activity/index";
import { ACTIVITY_LIST_ROOT } from "@/store/activity/mutations";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: "vuex",
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    [ACTIVITY_LIST_ROOT]: articleModule,
  },
  plugins: [vuexLocal.plugin],
});
