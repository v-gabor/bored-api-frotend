import {
  shallowMount,
  mount,
  createLocalVue,
  VueClass,
  Wrapper,
} from "@vue/test-utils";
import Vuex from "vuex";
import ActivityComponent from "@/components/Activity.vue";
import { DefaultActivity, OtherActivity } from "./mock-activity";
import boredAPI from "@/plugins/bored-api";

describe("Activity.vue", () => {
  let wrapper: Wrapper<ActivityComponent>;
  let isHitNewOneButton = false;

  const $boredAPI = {
    getActivity: () => {
      console.log(isHitNewOneButton);

      return Promise.resolve(
        isHitNewOneButton ? OtherActivity : DefaultActivity
      );
    },
  };

  beforeEach(() => {
    const localVue = createLocalVue();

    localVue.use(Vuex);
    localVue.use(boredAPI);

    wrapper = shallowMount(ActivityComponent, {
      localVue,
      mocks: {
        $boredAPI,
      },
    });
  });

  it("Renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("Activity load properly on startup", () => {
    expect(wrapper.vm.$data.selectedActivity.activity).toBe(
      DefaultActivity.data.activity
    );

    expect(
      wrapper.findComponent({ ref: "selectedActivityActivity" }).text()
    ).toBe(DefaultActivity.data.activity);

    expect(wrapper.findComponent({ ref: "activityFiltersType" })).toBe(
      DefaultActivity.data.type
    );

    expect(
      wrapper.findComponent({ ref: "activityFiltersParticipants" })
    ).toEqual(DefaultActivity.data.participants);

    expect(
      wrapper.findComponent({ ref: "activityFiltersPriceSlider" })
    ).toEqual(DefaultActivity.data.price);
  });

  // it("Click on 'Hit me with a new one!' button", async (done) => {
  //   console.log(wrapper.vm.$data.selectedActivity.activity);

  //   isHitNewOneButton = true;
  //   // const newOneButton =
  //   wrapper.find("#newOneButton").trigger("click");
  //   // newOneButton.trigger("click");

  //   // wrapper.vm.$nextTick(() => {
  //   //   expect(wrapper.vm.$data.selectedActivity.activity).toBe(
  //   //     OtherActivity.data.activity
  //   //   );
  //   //   done();
  //   // });

  //   await wrapper.vm.$nextTick();

  //   expect(wrapper.vm.$data.selectedActivity.activity).toBe(
  //     OtherActivity.data.activity
  //   );
  // });
});
