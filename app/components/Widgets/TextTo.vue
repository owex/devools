<template>
  <div class="hexto">
    <Heading level="2" v-if="title">
      {{ title }}
    </Heading>
    <p class="mb-3" v-if="description">
      {{ description }}
    </p>
    <div class="mb-2">
      <label class="text-xs font-bold" for="text-to-input"> Text </label>
      <Input
        type="text"
        v-model="inputText"
        :placeholder="inputPlaceholder"
      />
    </div>
    <div class="mb-5">
      <label class="text-xs font-bold" for="text-to-output"> Converted </label>
      <Input
        type="text"
        v-model="outputText"
        :placeholder="outputPlaceholder"
      />
    </div>
    <div class="flex">
      <div class="mr-2" v-for="(item, index) in modes" :key="index">
        <Button @click="setMode(index)" :active="index === mode">
          {{ item.text }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Text To",
      description: "Convert text to Kebab/Snake or Camel case",
      opacity: 1,
      inputText: "",
      mode: "kebab",
      modes: {
        kebab: {
          text: "Kebab-case",
          delimiter: "-",
        },
        camel: {
          text: "camelCase",
          delimiter: " ",
        },
        studlycaps: {
          text: "StudlyCaps",
          delimiter: " ",
        },
        snake: {
          text: "Snake_Case",
          delimiter: "_",
        },
      },
      inputPlaceholder: "Hello World",
    };
  },
  computed: {
    outputText() {
      return this.formatString(this.inputText);
    },
    outputPlaceholder() {
      return this.formatString(this.inputPlaceholder);
    },
    currentMode() {
      return this.modes[this.mode];
    }
  },
  methods: {
    /**
     * set the first letter to lowerCase
     *
     * @param   {string}  string
     * @return  {string}
     */
    lowercaseFirstLetter(string) {
      return string.charAt(0).toLowerCase() + string.slice(1);
    },
    /**
     * [setMode description]
     *
     * @param   {string}  newMode
     * @return  {void}
     */
    setMode(newMode) {
      this.mode = newMode;
    },
    /**
     * Set the input value
     *
     * @return  {void}
     */
    setInput() {
      let input = this.outputText
        .split(this.currentMode.delimiter)
        .join(" ")
        .replace(/\//g, "");

      if (this.mode === "camel") {
        input = input
          .split(/(?=[A-Z])/)
          .join(" ")
          .toLowerCase();
      }

      this.inputText = decodeURI(input);
    },
    /**
     * Get the output value
     *
     * @return  {string} - text
     */
    formatString(text) {
      let formattedText = text.trim().toLowerCase();

      if (this.mode === "camel" || this.mode === "studlycaps") {
        let formattedTextArray = [...formattedText.trim().toLowerCase().split(" ")];
        for (let i = 0; i < formattedTextArray.length; i++) {
          formattedTextArray[i] =
            formattedTextArray[i].charAt(0).toUpperCase() +
            formattedTextArray[i].substring(1);
        }
        formattedText = formattedTextArray.join("");

        if (this.mode === "camel") {
          formattedText = this.lowercaseFirstLetter(formattedText);
        }
      } else {
        formattedText = formattedText.split(" ").join(this.currentMode.delimiter);
      }
      return encodeURI(formattedText);
    },
  },
};
</script>
