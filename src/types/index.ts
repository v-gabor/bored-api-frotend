export type ActivityType =
  | "education"
  | "recreational"
  | "social"
  | "diy"
  | "charity"
  | "cooking"
  | "relaxation"
  | "music"
  | "busywork";

export enum UIState {
  Loading,
  NoData,
  Loaded,
}

export interface Activity {
  key: number;
  activity: string;
  accessibility: number;
  type: ActivityType;
  participants: number;
  price: number;
  error?: string;
}

export type ActivityRequestParams = {
  key?: number;
  activity?: string;
  accessibility?: number;
  type?: ActivityType;
  participants?: number;
  price?: number;
  priceSlider?: number;
};

export interface ActivityRequestConfig {
  params?: ActivityRequestParams;
}
