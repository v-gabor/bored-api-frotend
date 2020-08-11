<template>
  <v-container>
    <v-row class="fill-height">
      <v-col cols="12" md="7" class="pt-0 pb-0">
        <v-row v-if="hasError" class="text-center fill-height activity-are" align="center">
          <v-col>
            Sorry!
            <br />
            <v-icon x-large>mdi-emoticon-sad-outline</v-icon>
            <br />We found nothing with these settings
          </v-col>
        </v-row>
        <v-row v-else class="fill-height activity-are">
          <v-col>
            <div class="d-flex flex-column fill-height">
              <span class="headline flex-shrink-1 mb-2">You should:</span>
              <v-card class="flex-grow-1 text-center">
                <v-card-text class="fill-height">
                  <v-row class="text-center fill-height headline" align="center">
                    <v-col v-if="!isLoading" id="selectedActivityActivity">
                      {{
                      selectedActivity.activity
                      }}
                    </v-col>
                    <v-col v-else>
                      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <div class="action-buttons">
                <v-btn
                  color="#47be88"
                  class="white--text"
                  block
                  @click="saveForLater"
                >Save for later</v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="5">
        <div class="d-flex flex-column fill-height">
          <div class="flex-grow-1">Activity details:</div>
          <div class="flex-grow-1" id="activityFiltersType">
            <v-autocomplete
              @change="filterActivity"
              v-model="activityFilters.type"
              :items="items"
              label="Type"
            ></v-autocomplete>
          </div>
          <div class="flex-grow-1" id="activityFiltersParticipants">
            <v-text-field
              @change="filterActivity"
              v-model="activityFilters.participants"
              label="Number"
              :rules="numberRule"
            >
              <template v-slot:append-outer>
                <v-btn class="ma-0 mr-1" fab x-small @click="decrementParticipants">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <v-btn class="ma-0" fab x-small @click="incrementParticipants">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </div>
          <div class="flex-grow-1" id="activityFiltersPriceSlider">
            <span class="slider-label">Budget</span>
            <v-slider
              @change="filterActivity"
              v-model="activityFilters.priceSlider"
              min="0"
              max="100"
              dense
              hide-details
            ></v-slider>
            <span class="d-inline-block slider-hint">cheap</span>
            <span class="d-inline-block slider-hint text-right">expensive</span>
          </div>
          <div class="action-buttons">
            <v-btn
              id="newOneButton"
              color="#52b9d3"
              class="white--text"
              block
              @click="filterActivity"
            >Hit me with a new one!</v-btn>
          </div>
        </div>
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
import { Action } from "vuex-class";

@Component
export default class Home extends Vue {
  @Action("addActivity", { namespace: "activity" })
  addActivity!: (activity: Activity) => void;

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

  numberRule = [
    (v: string): string | boolean => {
      if (!isNaN(parseInt(v))) return true;
      return "Not a number!";
    },
  ];

  get hasError(): boolean {
    if (this.state == UIState.NoData) return true;
    else return false;
  }

  get isLoading(): boolean {
    if (this.state == UIState.Loading) return true;
    else return false;
  }

  get isLoaded(): boolean {
    if (this.state == UIState.Loaded) return true;
    else return false;
  }

  filterActivity(): void {
    this.activityFilters.price = this.activityFilters.priceSlider
      ? this.activityFilters.priceSlider / 100
      : 0;

    this.$boredAPI.getActivity(this.activityFilters).then((res) => {
      this.selectedActivity = res.data;

      if (res.data.error) {
        this.state = UIState.NoData;
      } else {
        this.activityFilters = {
          type: this.selectedActivity.type,
          participants: this.selectedActivity.participants,
          price: this.selectedActivity.price,
          priceSlider: this.selectedActivity.price * 100,
        };

        this.state = UIState.Loaded;
      }
    });
  }

  getRandomActivity(): void {
    this.state = UIState.Loading;
    this.$boredAPI.getActivity().then((res) => {
      this.selectedActivity = res.data;
      this.activityFilters = {
        type: this.selectedActivity.type,
        participants: this.selectedActivity.participants,
        price: this.selectedActivity.price,
        priceSlider: this.selectedActivity.price * 100,
      };

      this.state = UIState.Loaded;
    });
  }

  saveForLater(): void {
    if (this.selectedActivity) {
      this.addActivity(this.selectedActivity);
    }
  }

  incrementParticipants(): void {
    if (
      !this.activityFilters.participants ||
      isNaN(this.activityFilters.participants)
    ) {
      this.activityFilters.participants = 1;
    } else {
      this.activityFilters.participants = this.activityFilters.participants + 1;
    }
    this.filterActivity();
  }

  decrementParticipants(): void {
    if (
      !this.activityFilters.participants ||
      isNaN(this.activityFilters.participants) ||
      this.activityFilters.participants === 1
    ) {
      this.activityFilters.participants = 1;
    } else {
      this.activityFilters.participants = this.activityFilters.participants - 1;
    }
    this.filterActivity();
  }

  created(): void {
    this.getRandomActivity();
  }
}
</script>
<style lang="sass">
@import "~vuetify/src/styles/styles.sass"
.action-buttons
  button
    margin-top: 10px

.slider-label
  color: rgba(0, 0, 0, 0.6)
  height: 20px
  line-height: 20px
  font-size: 13px

.slider-hint
  color: rgba(0, 0, 0, 0.6)
  height: 20px
  line-height: 20px
  font-size: 13px
  width: 50%

@media #{map-get($display-breakpoints, 'sm-and-down')}
  .activity-are
    height: 250px
</style>
