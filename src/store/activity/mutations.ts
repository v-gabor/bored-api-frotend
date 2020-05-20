import { MutationTree } from "vuex";
import { ActivityListState } from "./types";
import { Activity } from "@/types/index";

/**
 * Root path of the mutations
 */
export const ACTIVITY_LIST_ROOT = "activity";

/**
 * Available mutations
 */
export const ACTIVITY_LIST_MUTATIONS = {
  /**
   * "Add activity" mutation index
   */
  ADD_ACTIVITY: `${ACTIVITY_LIST_ROOT}/addActivity`,
  /**
   * "Remove specified activity" mutation index
   */
  REMOVE_ACTIVITY: `${ACTIVITY_LIST_ROOT}/removeActivity`,
  /**
   * "Remove all activity" mutation index
   */
  REMOVE_ALL_ACTIVITY: `${ACTIVITY_LIST_ROOT}/removeAllActivity`,
};

export const mutations: MutationTree<ActivityListState> = {
  /**
   * This mutation add new activity to the activity list
   * @param state : ActivityListState
   * @param payload : Activity
   */
  [ACTIVITY_LIST_MUTATIONS.ADD_ACTIVITY](state, payload: Activity) {
    if (
      !state.storedActivities.filter((item) => {
        return payload.key === item.key;
      }).length
    ) {
      state.storedActivities.push(payload);
    }
  },
  /**
   * This mutation remove a specified activity from the activity list
   * @param state
   * @param payload
   */
  [ACTIVITY_LIST_MUTATIONS.REMOVE_ACTIVITY](state, payload: Activity) {
    let toRemoveIndex = null;
    for (let i = 0; i < state.storedActivities.length; i++) {
      if (state.storedActivities[i].key === payload.key) {
        toRemoveIndex = i;
        break;
      }
    }

    if (toRemoveIndex !== null) {
      state.storedActivities.splice(toRemoveIndex, 1);
    }
  },
  /**
   * This mutation remove all activity from the activity list
   * @param state
   */
  [ACTIVITY_LIST_MUTATIONS.REMOVE_ALL_ACTIVITY](state) {
    state.storedActivities = [];
  },
};
