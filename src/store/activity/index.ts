import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { ActivityListState } from "./types";
import { RootState } from "../types";

export const state: ActivityListState = {
  storedActivities: [],
};

const namespaced = true;

export const articleModule: Module<ActivityListState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
