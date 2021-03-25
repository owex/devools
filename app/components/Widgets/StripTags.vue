<template>
  <div class="hexto">
    <div>
      <Heading level="2">
        {{ title }}
      </Heading>
      <p v-if="description" class="mb-3">
        {{ description }}
      </p>
    </div>
    <div class="mt-3 p-2 border">
      <textarea class="w-full focus:outline-none" v-model="input" placeholder="Start typing or copying your html here..." v-on:keyup="inputChange()"rows="5"></textarea>
    </div>
    <prism language="html">{{ output }}</prism>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Strip Tags',
      description: 'Remove HTML tags and leave intact the raw text.',
      input: '',
      output: '',
      copied: false
    }
  },
  methods: {
    inputChange(mode) {
      let doc = new DOMParser().parseFromString(this.input, 'text/html');
      this.output = doc.body.textContent || "";
    }
  }
}
</script>
