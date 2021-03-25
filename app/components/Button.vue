<template>
  <button
    @click="$emit('click')"
    class="inline-block px-3 py-2 text-xs font-medium leading-6 text-center transition border-2 focus:outline-none"
    :class="{'bg-primary border-primary text-white': active, 'bg-transparent text-blue-700 border-blue-700 hover:bg-blue-100' : !active}">
    <slot></slot>
  </button>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Button',
    props: {
      active: {
        type: Boolean,
      }
    }
  })

</script>
