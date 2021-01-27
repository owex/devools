<template>
  <div class="html-generator">
    <Heading level="2">
      HTML List Generator
    </Heading>

    <div class="flex flex-wrap">
      <Button class="mr-2" v-on:click="ruleChange('ol')" :active="rules.ol ">ol</Button>
      <Button class="mr-2" v-on:click="ruleChange('ul')" :active="rules.ul">ul</Button>
      <Button class="mr-2" v-on:click="ruleChange('break')" :active="rules.break">br</Button>
      <Button class="mr-2" v-on:click="ruleChange('paragraph')" :active="rules.paragraph">p</Button>
    </div>
    <div class="mt-3 p-2 border">
      <textarea class="w-full focus:outline-none" v-model="input" v-on:keyup="inputChange" placeholder="my list item" rows="5"></textarea>
    </div>
    <div class="mt-3">
      <prism language="html">{{ output }}</prism>
    </div>
    <div class="mt-2">
      {{input.length}} characters | {{input.split(/\b[\s,\.-:;]*/).length}} words
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      output: '',
      rules: {
        ul: true,
        ol: false,
        paragraph: false,
        break: false,
        anchor: false,
        inline: false,
        captalise: false
      }
    }
  },
  methods: {
    ruleChange(rule) {
      this.rules.ul = false
      this.rules.ol = false
      this.rules.paragraph = false
      this.rules.break = false

      this.rules[rule] = true
      this.inputChange()
    },
    inputChange() {
      let newline = '\n'
      if (this.inline) {
        newline = ''
      }
      let text = this.input

      // Split to new line;
      text = text.split('\n')

      // Loop lines
      let output = ''

      if (this.rules.ul) {
        output += '<ul>'
      }

      if (this.rules.ol) {
        output += '<ol>'
      }

      if (this.rules.ol || this.rules.ul && this.rules.inline === false) {
        output += newline
      }
      // Loop
      for (var i = 0; i < text.length; i++) {
        if (this.rules.ul || this.rules.ol) {
          output += '<li>'
        }

        if (this.rules.paragraph) {
          output += '<p>'
        }

        if (this.rules.anchor) {
          output += '<a href="">'
        }

        if (this.rules.captalise) {
          output += text[i].toUpperCase()
        } else {
          output += text[i]
        }

        if (this.rules.anchor) {
          output += '</a>'
        }

        if (this.rules.paragraph) {
          output += '</p>'
        }

        if (this.rules.ul || this.rules.ol) {
          output += '</li>'
        }

        if (this.rules.break) {
          output += '<br />'
        }
        output += newline
      }

      if (this.rules.ol) {
        output += '</ol>'
      }

      if (this.rules.ul) {
        output += '</ul>'
      }

      this.output = output
    }
  }
}
</script>
