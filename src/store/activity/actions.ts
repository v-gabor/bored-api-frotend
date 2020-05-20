import { ActionTree } from "vuex";
import { RootState } from "@/store/types";
import { ACTIVITY_LIST_MUTATIONS } from "./mutations";
import { Activity } from "@/types/index";
import { ActivityListState } from "./types";

export const actions: ActionTree<ActivityListState, RootState> = {
  /**
   * "Add activity to activity list" action
   * @param param0
   * @param activity
   */
  addActivity({ commit }, activity: Activity): void {
    commit(ACTIVITY_LIST_MUTATIONS.ADD_ACTIVITY, activity);
  },
  /**
   * "Remove specified activity" action
   * @param param0
   * @param activity
   */
  removeActivity({ commit }, activity: Activity): void {
    commit(ACTIVITY_LIST_MUTATIONS.REMOVE_ACTIVITY, activity);
  },
  /**
   * "Remove all activities" action"
   * @param param0
   */
  emptyActivityList({ commit }): void {
    commit(ACTIVITY_LIST_MUTATIONS.REMOVE_ALL_ACTIVITY, null);
  },
};
