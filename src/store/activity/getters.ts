import { GetterTree } from "vuex";
import { ActivityListState } from "./types";
import { RootState } from "../types";
import { Activity } from "@/types/index";

export const getters: GetterTree<ActivityListState, RootState> = {
  /**
   * It is returning with the stored activity list
   * @param state
   */
  getActivities(state): Activity[] {
    const { storedActivities } = state;

    return storedActivities;
  },
};
