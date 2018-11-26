<template>
  <ul :class="b().toString()">
    <li
      v-for="(item, index) in renderItems"
      :class="b('item').toString()"
      :key="index">

      <input
        v-model="selected"
        :class="b('button').toString()"
        :value="item.value"
        :name="name"
        :id="item.id"
        type="radio">

      <label
        :class="b('label', { color: 'white' }).toString()"
        :for="item.id">{{ item.display }}</label>

      <div :class="b('outside', { color: 'white' }).toString()">
        <div class="inside" />
      </div>
    </li>
  </ul>
</template>
<script>
import { props as tokens } from '@/assets/tokens/tokens.raw.json';

/**
 * Example component is used to visually communicate core parts of the product
 * and available actions.
 */
export default {
  name: 'RadioGroup',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'radio',
  props: {
    /**
     * Name of the radio group in the form.
     */
    name: {
      type: String,
      default: 'radiogroup',
    },
    /**
     * A list of items to render. Each item must have a `display` and a `value`.
     *
     *
     * `[ { display: 'Green', value: 'a' } ]`
     */
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selected: null,
    };
  },
  computed: {
    // Add an id property to each item so the label can reference it
    renderItems() {
      return this.items.map(item => (
        {
          ...item,
          id: this.radioId(item),
        }
      ));
    },
  },
  watch: {
    selected() {
      this.$emit('change', this.selected);
    },
  },
  methods: {
    radioId(item) {
      return `${tokens.prefix_component.value}radio-${this.name}-item-${item.value}`;
    },
  },
};
</script>

<docs>
  ```jsx
  <RadioGroup
    name="example"
    :items="[ { display: 'Green', value: 'a' }, { display: 'Blue', value: 'b' } ]" />
  ```
</docs>
