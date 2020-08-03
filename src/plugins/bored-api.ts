import _Vue from "vue";
import { GET_ACTIVITY } from "@/api/activity/index";
import { ActivityRequestConfig, Activity } from "@/types/index";
import { AxiosResponse } from "axios";

const BoredApi = {
  install: (Vue: typeof _Vue): void => {
    Vue.$boredAPI = {
      getActivity: (requestParams): Promise<AxiosResponse<Activity>> => {
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
