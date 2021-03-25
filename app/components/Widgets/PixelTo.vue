<template>
  <div class="pixelto">
    <Heading level="2" v-if="title">
      {{ title }}
    </Heading>
    <p class="mb-3" v-if="description">
      {{ description }}
    </p>

    <div>
      <label class="text-xs font-bold" for="base">
        Base Pixel
      </label>
      <Input type="number" v-model="base" @input="inputChange" id="base" />
    </div>
    <div class="flex">
      <div class="w-full md:pr-5">
        <label class="text-xs font-bold" for="pixel">
          Pixels
        </label>
        <Input type="number" v-model="pixel" @input="inputChange" id="pixel" />
        <p class="mt-1">
          {{ this.resultEm }}em
        </p>
      </div>
      <div class="w-full">
        <label class="text-xs font-bold" for="em">
          EM/REM
        </label>
        <Input type="number" v-model="em" @input="inputChange" id="em" />
        <p class="mt-1">
          {{ this.resultPixel }}px
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
        title: 'Pixel To EM / REM',
        description: 'Convert pixels to em\'s/rem',
        base: 16,
        pixel: 16,
        em: 1,
        resultEm: 1,
        resultPixel: 16
    }
  },
  methods: {
    inputChange() {
      this.resultEm = parseFloat((this.pixel / this.base).toFixed(3));
      this.resultPixel = parseFloat((this.base * this.em).toFixed(3));
    }
  }
}
</script>
