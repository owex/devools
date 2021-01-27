<script lang="ts">
  import Vue, { PropOptions } from 'vue'

  export default Vue.extend({
    name: 'Heading',
    props: {
      level: {
        type: String,
        required: true,
        validator: function(value: string) {
          return parseInt(value) > 0 && parseInt(value) < 7
        }
      } as PropOptions<String>,
      size: {
        type: String,
        default: 'xl'
      }
    },
    render: function (createElement) {
      return createElement(
        'h' + this.level,
        { class: `mb-3 text-primary text-${this.size} font-semibold font-heading` },
        this.$slots.default
      )
    },
  })
</script>
