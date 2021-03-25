
<template>
  <span class="relative" @mouseover="toggleDropdown = true" @mouseleave="toggleDropdown = false">
    <a v-if="external" :href="link" :class="styleClasses">
      {{ title }}
    </a>

    <NuxtLink v-else :to="link" :class="styleClasses">
      {{ title }}
    </NuxtLink>

    <div class="absolute z-50 w-40 pt-3" v-if="children && toggleDropdown">
      <div class="bg-primary p-2 text-sm" v-for="(item, index) in children" :key="index">
        <a v-if="item.external" :href="item.path" target="_blank" :class="styleClasses">
          {{ item.title }}
        </a>
        <NuxtLink v-else :to="item.path" :class="styleClasses">
          {{ item.title }}
        </NuxtLink>
      </div>
    </div>

  </span>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    external: Boolean,
    children: Array,
  },
  data() {
    return {
      toggleDropdown: false
    }
  },
  computed: {
    styleClasses() {
      return 'mr-3 text-md hover:text-gray-200';
    }
  }
}
</script>
