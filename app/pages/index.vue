<template>
  <div class="px-5">
     <h1 class="py-2 text-lg text-center">
       Convert Hex To RGB, Text to Camel, Snake and Kebab Case, Pixels to EM's and more...
     </h1>
    <div class="flex flex-wrap overflow-hidden md:-mx-1 xl:-mx-6">
      <div class="w-full overflow-hidden mt-3 md:my-1 md:px-1 md:w-full xl:my-6 xl:px-6 xl:w-4/12">
        <TextTo class="pb-5 border-b" />
        <PasswordGenerator class="mt-3" />
      </div>
      <div class="w-full overflow-hidden mt-3 md:my-1 md:px-1 md:w-full xl:my-6 xl:px-6 xl:w-5/12">
        <ColourManager class="pb-5 border-b" />
        <HtmlGenerator class="mt-3"  />
      </div>
      <div class="w-full overflow-hidden mt-3 md:my-1 md:px-1 md:w-full xl:my-6 xl:px-6 xl:w-3/12">
        <PixelTo class="pb-5 border-b"  />
        <StripTags class="mt-3" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({

})
</script>

<style>
</style>
