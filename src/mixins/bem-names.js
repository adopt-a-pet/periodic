/**
 * This is the Vue equivalent of the sass utilities we have for BEM.
 */

import { setup } from "bem-cn"
import { props } from "@/assets/tokens/tokens.raw.json"

const prefix = props.prefix_component
const block = setup({
  mod: "--",
  modValue: "-",
})

export default {
  computed: {
    /**
     * To prevent namespace collisions when these components are included in
     * other projects, we can have a globally-applied prefix to all of our
     * component class names.
     */
    b() {
      const b = block(prefix.value + this.$options.blockName)
      return b
    },
  },
}
