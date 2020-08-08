import { AxiosResponse } from "axios";
import { Activity, ActivityRequestParams } from "./index";

declare module "vue/types/vue" {
  interface Vue {
    $boredAPI: {
      /**
       * It is returning with an activity which is fit the passed params. Without parameters returns a random activity.
       */
      getActivity: (
        requestConfig?: ActivityRequestParams
      ) => Promise<AxiosResponse<Activity>>;
    };
  }
}
