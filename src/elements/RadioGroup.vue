<template>
  <ul
    :class="b().toString()"
    :style="gridStyles">
    <li
      v-for="(item, index) in renderItems"
      :key="index"
      :class="b('item').toString()">
      <input
        :id="item.id"
        :class="b('button').toString()"
        :name="name"
        :checked="item.value === value"
        type="radio"
        @change="select($event.target, item.value)">

      <label
        :class="b('label', { color: 'white' }).toString()"
        :for="item.id">{{ item.display }}</label>

      <label
        :class="b('outside', { color: 'white' }).toString()"
        :for="item.id" />
    </li>
  </ul>
</template>
<script>
import tokens from '@/assets/tokens/tokens.json';

/**
 * Render a set of radio buttons that has a `value` of the
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
      default: null,
    },
    /**
     * The number of columns in each row of buttons.
     */
    columns: {
      type: Number,
      default: 1,
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
    gridStyles() {
      return {
        'grid-template-columns': `repeat(${this.columns}, 1fr)`,
      };
    },
  },
  methods: {
    radioId(item) {
      return `${tokens.prefix_component}radio-${this.name}-item-${item.value}`;
    },
    select({ checked }, value) {
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
      return this.validateRequired(this.required, this.value);
    },
  },
};
</script>

<docs>
```vue
<template>
<div>
  <Heading
    font-family="museo"
    level="h4">1 Column (default)</Heading>

  <RadioGroup
    v-model="radioGroupSelected"
    name="example"
    :items="[
      { display: 'One', value: '1' },
      { display: 'Two', value: '2' },
      { display: 'Three', value: '3' }
    ]" />

  <VSpacer size="l" />

  <Heading
    font-family="museo"
    level="h4">3 Columns</Heading>

  <RadioGroup
    v-model="radioGroupSelected2"
    name="example2"
    :columns="3"
    :items="[
      { display: 'One', value: '1' },
      { display: 'Two', value: '2' },
      { display: 'Three', value: '3' }
    ]" />
</div>
</template>
<script>
export default {
  data() {
    return {
      radioGroupSelected: '2',
      radioGroupSelected2: '2',
    }
  }
};
</script>
```
</docs>
