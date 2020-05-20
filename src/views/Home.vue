<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col cols="8" style="min-height: 300px; max-height: 350px;">
            <v-tabs v-model="tab" background-color="primary" dark>
              <v-tab v-for="item in items" :key="item.tab" :to="item.path">{{
                item.tab
              }}</v-tab>
            </v-tabs>
            <router-view class="router-view"></router-view>
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
    { tab: "My list", path: "/my-activities" },
  ];
}
</script>

<style lang="scss">
.router-view {
  border: 2px solid #1976d2;
  border-top: 0;
  min-height: 300px;
  max-height: 600px;
}
</style>
