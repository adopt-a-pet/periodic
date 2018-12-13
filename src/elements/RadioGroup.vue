<template>
  <ul :class="b().toString()">
    <li
      v-for="(item, index) in renderItems"
      :class="b('item').toString()"
      :key="index">

      <input
        :class="b('button').toString()"
        :value="item.value"
        :name="name"
        :id="item.id"
        :checked="item.value === value"
        type="radio"
        @change="select($event.target)">

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
import tokens from '@/assets/tokens/tokens.json';

/**
 * Render a set of radio buttons radio buttons that has a `value` of the
 * currently selected button
 */
export default {
  name: 'RadioGroup',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'radio',
  model: {
    event: 'change',
    prop: 'value',
  },
  props: {
    /**
     * Name of the radio group in the form.
     */
    name: {
      type: String,
      default: 'radiogroup',
    },
    /**
     * Whether the form field is required or not.
     */
    required: {
      type: Boolean,
      default: false,
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
      validator: items => items.every(item => ('display' in item) && ('value' in item)),
    },
    /**
     * The value of the selected item.
     */
    value: {
      type: String,
      default: null,
    },
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
  methods: {
    radioId(item) {
      return `${tokens.prefix_component}radio-${this.name}-item-${item.value}`;
    },
    select({ value, checked }) {
      if (!checked) return;

      /**
       * Change event
       *
       * @event change
       * @type String
       */
      this.$emit('change', value);
    },
    validate() {
      let valid = true;

      if (this.required && !this.value) valid = false;

      return valid;
    },
  },
};
</script>

<docs>
```vue
<template>
  <RadioGroup
    v-model="radioGroupSelected"
    name="example"
    :items="[
      { display: 'One', value: '1' },
      { display: 'Two', value: '2' },
      { display: 'Three', value: '3' }
    ]" />
</template>
<script>
export default {
  data() {
    return {
      radioGroupSelected: '2', // Change this to change the value item
    }
  }
};
</script>
```
</docs>
