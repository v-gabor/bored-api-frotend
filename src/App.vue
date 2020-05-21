<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>
