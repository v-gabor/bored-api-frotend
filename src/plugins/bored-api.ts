import _Vue from "vue";
import { GET_ACTIVITY } from "@/api/activity/index";
import { ActivityRequestConfig } from "@/types/index";

const BoredApi = {
  install: (Vue: typeof _Vue) => {
    Vue.$boredAPI = {
      getActivity: (requestParams) => {
        const requestConfig: ActivityRequestConfig = Object.assign(
          {},
          { params: requestParams || {} }
        );
        return GET_ACTIVITY(requestConfig);
      },
    };
  },
};

export default BoredApi;
