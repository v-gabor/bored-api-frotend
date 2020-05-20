<template>
  <div>ActivityList komponens</div>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class ActivityList extends Vue {
  created() {
    console.log("ActivityList komponens");
  }
}
</script>
