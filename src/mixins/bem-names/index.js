/**
 * This is the Vue equivalent of the sass utilities we have for BEM.
 */

import { props } from "@/assets/tokens/tokens.raw.json"

const prefix = props.prefix_component

export default {
  computed: {
    /**
     * To prevent namespace collisions when these components are included in
     * other projects, we can have a globally-applied prefix to all of our
     * component class names.
     */
    componentClassWithPrefix() {
      return prefix.value + this.$options.componentBaseClass
    },
  },

  methods: {
    withModifier(modifier, withPrefix = true) {
      const componentClass = withPrefix ? this.componentClassWithPrefix : this.componentBaseClass

      return `${componentClass}--${modifier}`
    },
  },
}
