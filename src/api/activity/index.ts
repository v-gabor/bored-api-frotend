import { Activity, ActivityRequestConfig } from "@/types/types";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import AxiosService from "@/plugins/axios";

/**
 * It is returning an activity from API by passed config.
 *
 * @param requestConfig
 */
export function GET_ACTIVITY(
  requestConfig?: ActivityRequestConfig
): Promise<AxiosResponse<Activity>> {
  const axiosRequestConfig: AxiosRequestConfig = Object.assign(
    {},
    requestConfig
  );

  return AxiosService.get("/activity", axiosRequestConfig);
}
