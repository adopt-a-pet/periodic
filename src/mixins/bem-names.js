/**
 * This is the Vue equivalent of the sass utilities we have for BEM.
 */

import { setup } from 'bem-cn';
import tokens from '@/assets/tokens/tokens.json';

const prefix = tokens.prefix_component;
const componentClass = tokens.periodic_component_class;
const block = setup({
  mod: '--',
  modValue: '-',
});

export default {
  computed: {
    /**
     * To prevent CSS namespace collisions when these components are included in
     * other projects, we can have a globally-applied prefix to all of our
     * component class names.
     */
    b() {
      if (!this.$options.blockName) throw new Error('To use this mixin your component must have a blockName property');

      const b = block(prefix + this.$options.blockName);
      const bWithComponentClass = (name, m) => {
        let modifiers = m;

        // Just like how `.mix` allows an Array or an Object to be passed, this
        // allows the same for modifiers. All modifiers passed will become --name
        // and not --name-value modifiers. Use an Object for --name-value type.
        if (Array.isArray(modifiers)) {
          modifiers = {};

          m.forEach(modifier => {
            // `name` could be null
            if (modifier) modifiers[modifier] = true;
          });
        }

        return b(name, modifiers).mix(prefix + componentClass);
      };

      Object.assign(bWithComponentClass, b);

      // .mix adds a generic Periodic class which will allow us to set up global
      // styles for every component without polluting other codebases where
      // periodic is used
      return bWithComponentClass;
    },
  },

  methods: {
    block(blockName) {
      return block(prefix + blockName);
    },
  },
};
