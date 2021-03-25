<template>
  <ul class="flex mb-5 text-gray-500 text-sm lg:text-base">
    <li class="inline-flex items-center">
      <a href="/">Home</a>
      <svg
        fill="currentColor"
        viewBox="0 0 20 20"
        class="h-5 w-auto text-gray-400"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </li>
    <li class="inline-flex items-center" v-for="(crumb, index) in crumbs" :key="crumb.path">
      <NuxtLink :to="crumb.path">
        {{ crumb.text }}
      </NuxtLink>
      <svg
        fill="currentColor"
        viewBox="0 0 20 20"
        class="h-5 w-auto text-gray-400"
        v-if="index + 1 !== crumbs.length"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "BreadCrumbs",
  props: {
    crumbs: {
      type: Array,
    },
  },
});
</script>
