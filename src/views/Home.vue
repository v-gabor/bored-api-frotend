<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col
            cols="12"
            sm="10"
            md="9"
            lg="7"
            xl="6"
            class="activity-container d-flex flex-column"
          >
            <div class="d-flex flex-column fill-height">
              <v-tabs
                v-model="tab"
                background-color="primary"
                dark
                class="flex-shrink-1 flex-grow-0 tab-menu"
              >
                <v-tab v-for="item in items" :key="item.tab" :to="item.path">
                  {{
                  item.tab
                  }}
                </v-tab>
              </v-tabs>
              <router-view class="router-view flex-grow-1 px-6 py-2"></router-view>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  tab = null;
  items = [
    { tab: "Activities", path: "/i-am-boring" },
    { tab: "My list", path: "/my-activities" }
  ];
}
</script>

<style lang="sass">

@import '~vuetify/src/styles/styles.sass'

.router-view, .tab-menu
  border: 2px solid #5e8390

.tab-menu
  border-bottom: 0

.activity-container  
  height: 100%
  > div
    max-width: 750px
    margin: auto
    width: 100%


@media #{map-get($display-breakpoints, 'md-and-up')}
  .activity-container
    height: 400px
</style>
