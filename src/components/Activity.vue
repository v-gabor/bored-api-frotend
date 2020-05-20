<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-row>
          <v-col v-if="hasError">ERROR</v-col>
          <v-col v-else-if="isLoading">loading</v-col>
          <v-col v-else-if="isLoaded">
            <div>{{ selectedActivity.activity }}</div>
            <div>
              <v-btn @click="saveForLater">Save for later</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-row>
          <v-col cols="12" class="pt-0">Activity details:</v-col>
          <v-col cols="12" class="pt-0">
            <v-autocomplete
              @change="filterActivity"
              v-model="activityFilters.type"
              :items="items"
              dense
              filled
              label="Type"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-text-field
              @change="filterActivity"
              v-model="activityFilters.participants"
              label="Participant"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-slider
              @change="filterActivity"
              label="Budget"
              v-model="activityFilters.price"
              min="0"
              max="100"
            ></v-slider>
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-btn @click="getRandomActivity">Hit me with a new one!</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import {
  UIState,
  Activity,
  ActivityType,
  ActivityRequestParams,
} from "../types/index";

@Component
export default class Home extends Vue {
  state = UIState.Loading;
  selectedActivity: Activity | null = null;
  activityFilters: ActivityRequestParams = {};

  items: ActivityType[] = [
    "education",
    "recreational",
    "social",
    "diy",
    "charity",
    "cooking",
    "relaxation",
    "music",
    "busywork",
  ];

  value = null;

  get hasError() {
    if (this.state == UIState.HasError) return true;
    else return false;
  }

  get isLoading() {
    if (this.state == UIState.Loading) return true;
    else return false;
  }

  get isLoaded() {
    if (this.state == UIState.Loaded) return true;
    else return false;
  }

  filterActivity() {
    Vue.$boredAPI.getActivity(this.activityFilters).then((res) => {
      this.selectedActivity = res.data;

      if (res.data.error) {
        this.state = UIState.HasError;
      } else {
        this.activityFilters = {
          type: this.selectedActivity.type,
          participants: this.selectedActivity.participants,
          price: this.selectedActivity.price * 100,
        };

        this.state = UIState.Loaded;
      }
    });
  }

  getRandomActivity() {
    Vue.$boredAPI.getActivity().then((res) => {
      this.selectedActivity = res.data;
      this.activityFilters = {
        type: this.selectedActivity.type,
        participants: this.selectedActivity.participants,
        price: this.selectedActivity.price * 100,
      };

      this.state = UIState.Loaded;
    });
  }

  saveForLater() {
    console.log("TODO: Save for later");
  }

  created() {
    this.getRandomActivity();
  }
}
</script>
