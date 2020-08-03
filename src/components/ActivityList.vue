<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height column">
      <v-col cols="12" class="fill-height">
        <div v-if="activityList.length" class="d-flex flex-column">
          <div class="flex-grow-1">
            <v-row class="fill-height" style="overflow-x: hidden;">
              <v-col cols="12" class="fill-height pt-0">
                <v-data-table
                  :height="`${tableHeight()}px`"
                  fixed-header
                  hide-default-footer
                  :headers="headers"
                  :items="activityList"
                >
                  <template v-slot:item.price="{ item }">
                    {{ priceWithWord(item.price) }}
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-icon @click="removeActivity(item)"
                      >mdi-trash-can-outline</v-icon
                    >
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </div>

          <div ref="clearAllButton" class="text-center flex-shrink-1 mt-3">
            <v-btn
              color="#52b9d3"
              block
              class="mr-2 white--text"
              @click="emptyActivityList"
              >Clear all</v-btn
            >
          </div>
        </div>

        <v-row class="text-center fill-height" v-else align="center">
          <v-col>
            <v-icon class="d-block" style="font-size: 80px;"
              >mdi-tray-remove</v-icon
            >
            <span class="title"
              >It seems you have not saved any activity to your list...</span
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Activity } from "@/types/index";
import { Action, Getter } from "vuex-class";
import { Component } from "vue-property-decorator";

@Component
export default class ActivityList extends Vue {
  @Getter("getActivities", { namespace: "activity" })
  activityList!: Activity[];

  @Action("removeActivity", { namespace: "activity" })
  removeActivity!: (activity: Activity) => void;

  @Action("emptyActivityList", { namespace: "activity" })
  emptyActivityList!: () => void;

  headers = [
    {
      text: "#",
      align: "start",
      value: "key",
    },
    { text: "Activity", value: "activity" },
    { text: "Participants", value: "participants", align: "center" },
    { text: "Budget", value: "price", align: "center" },
    { text: "Actions", value: "actions", sortable: false, align: "center" },
  ];

  priceWithWord(price: number): string {
    if (price < 0.2) {
      return "cheap";
    } else if (price >= 0.2 && price < 0.4) {
      return "less cheap";
    } else if (price >= 0.4 && price < 0.6) {
      return "mid price";
    } else if (price >= 0.6 && price < 0.7) {
      return "less expensive";
    } else if (price >= 0.7) {
      return "expensive";
    } else {
      return "indeterminable";
    }
  }

  /**
   * TODO:
   * Fix the table sizing!
   * Find a solution to Vuetify table sizing problem.
   */
  tableHeight(): number {
    return this.$vuetify.breakpoint.mdAndUp ? 230 : 480;
  }
}
</script>
