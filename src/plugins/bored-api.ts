import _Vue from "vue";
import { GET_ACTIVITY } from "@/api/activity/index";
import {
  ActivityRequestConfig,
  Activity,
  ActivityRequestParams,
} from "@/types/index";
import { AxiosResponse } from "axios";

const BoredAPI = {
  install: (Vue: typeof _Vue): void => {
    Vue.prototype.$boredAPI = {
      getActivity: (
        requestParams: ActivityRequestParams
      ): Promise<AxiosResponse<Activity>> => {
        const requestConfig: ActivityRequestConfig = Object.assign(
          {},
          { params: requestParams || {} }
        );
        return GET_ACTIVITY(requestConfig);
      },
    };
  },
};

export default BoredAPI;
