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
  HasError,
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
};

export interface ActivityRequestConfig {
  params?: ActivityRequestParams;
}
