<template>
  <ul
    :class="b().toString()"
    :style="gridStyles">
    <li
      v-for="(item, index) in renderItems"
      :key="index"
      :class="b('item').toString()">
      <Icon
        :name="item.icon"
        :class="b('icon').toString()" />

      <input
        :id="item.id"
        :class="b('button').toString()"
        :name="name"
        :checked="item.value === value"
        type="radio"
        @change="select($event.target, item.value)">

      <label
        :class="b('label', { color: 'white' }).toString()"
        :for="item.id"><b>{{ item.heading }}</b><br>{{ item.display }}</label>

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
  name: 'RadioGroupBox',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'radio-box',
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
      default: 'radiogroupbox',
    },
    /**
     * Whether the form field is required or not.
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * A list of items to render. Each item must have a 'heading', `display`, and a `value`.
     *
     *
     * `[ { heading: 'Color', display: 'Green', value: 'a' } ]`
     */
    items: {
      type: Array,
      default: () => [],
      validator: items => items.every(item => ('heading' in item) && ('display' in item) && ('value' in item)),
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
      return `${tokens.prefix_component}radio-box-${this.name}-item-${item.value}`;
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
    <RadioGroupBox
      v-model="radioGroupBox"
      name="npa-plan-selection"
      :columns="2"
      :items="[
        { heading: 'Heading One', display: 'One Content', icon: 'service-google', value: '1' },
        { heading: 'Heading Two', display: 'Two Content', icon: 'service-google', value: '2' },
      ]" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      radioGroupBox: '2',
    }
  }
};
</script>
```
</docs>
