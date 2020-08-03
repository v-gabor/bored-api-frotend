import { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: { name: "Activity" },
    children: [
      {
        name: "Activity",
        path: "i-am-boring",
        component: (): Promise<typeof import("*.vue")> => {
          return import(
            /* webpackChunkName: "activity" */ "../components/Activity.vue"
          );
        },
      },
      {
        path: "my-activities",
        component: (): Promise<typeof import("*.vue")> => {
          return import(
            /* webpackChunkName: "my-activities" */ "../components/ActivityList.vue"
          );
        },
      },
    ],
  },
];

export default routes;
