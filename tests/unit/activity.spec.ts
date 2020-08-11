import { mount, createLocalVue, Wrapper } from "@vue/test-utils";
import ActivityComponent from "@/components/Activity.vue";
import { DefaultActivity, OtherActivity } from "./mock-activity";
import boredAPI from "@/plugins/bored-api";
import Vuetify from "vuetify";

let isHitNewOneButton = false;
const $boredAPI = {
  getActivity: () => {
    return Promise.resolve(isHitNewOneButton ? OtherActivity : DefaultActivity);
  },
};

describe("Activity.vue", () => {
  let vuetify: typeof Vuetify;
  let wrapper: Wrapper<ActivityComponent>;

  beforeEach(() => {
    const localVue = createLocalVue();
    vuetify = new Vuetify({
      lang: {
        t: (val: string) => val,
      },
    });
    localVue.use(boredAPI);
    localVue.use(Vuetify);

    wrapper = mount(ActivityComponent, {
      localVue,
      vuetify,
      mocks: {
        $boredAPI,
      },
    });
  });

  it("Renders a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it("Activity load properly on startup", () => {
    expect(wrapper.vm.$data.selectedActivity.activity).toBe(
      DefaultActivity.data.activity
    );
  });

  it("'You should' are update correctly", () => {
    expect(wrapper.find("#selectedActivityActivity").text()).toBe(
      DefaultActivity.data.activity
    );
  });

  it("Filter fields have correct values", async () => {
    expect(
      wrapper.find("#activityFiltersType [type='hidden']").attributes().value
    ).toBe(DefaultActivity.data.type);

    expect(
      wrapper.find("#activityFiltersPriceSlider input").attributes().value
    ).toBe((+DefaultActivity.data.price * 100).toString());
  });

  it("Click on 'Hit me with a new one!' button, and activity change", async () => {
    expect(wrapper.find("#selectedActivityActivity").text()).toBe(
      DefaultActivity.data.activity
    );

    isHitNewOneButton = true;

    wrapper.find("#newOneButton").trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.selectedActivity.activity).toBe(
      OtherActivity.data.activity
    );
  });
});
