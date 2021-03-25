<template>
  <input
    :value="value"
    @input="$emit('input', $event.target.value)"
    v-bind="$attrs"
    class="block w-full px-3 py-2 sm:text-sm border border-gray-300 rounded-m shadow-sm	" />
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Input',
    props: ['value'],
    inheritAttrs: false,
  })

</script>

