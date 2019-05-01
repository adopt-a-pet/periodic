<template>
  <ul
    :class="b().toString()"
    :style="gridStyles">
    <li
      v-for="(item, index) in renderItems"
      :key="index">
      <Checkbox
        :id="item.id"
        :checked="boxChecked(item)"
        :size="size"
        @change="onCheck(item.value, $event)">
        <span :class="b('label').toString()">{{ item.display }}</span>
      </Checkbox>
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
  name: 'CheckboxGroup',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'checkbox-group',
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
      default: 'checkbox-group',
    },
    /**
     * The size of the checkboxes.
     *
     * `tiny, small, large`
     */
    size: {
      type: String,
      default: 'large',
      validator: value => value.match(/(tiny|small|large)/),
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
      type: Array,
      default: () => [],
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
    // Add an id property to each item
    renderItems() {
      return this.items.map(item => (
        {
          ...item,
          id: this.checkboxId(item),
        }
      ));
    },
    gridStyles() {
      const columns = new Array(this.columns);

      return {
        'grid-template-columns': columns.fill('1fr').join(' '),
      };
    },
  },
  methods: {
    checkboxId(item) {
      return `${tokens.prefix_component}checkbox-group-${this.name}-item-${item.value}`;
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
      return this.validateRequired(this.required, this.value.length);
    },
    boxChecked({ value: checkboxValue }) {
      return this.value.includes(checkboxValue);
    },
    onCheck(value, selected) {
      console.log('hi');
      /**
       * Change event
       *
       * @event change
       * @type Array
       */
      if (selected) {
        this.$emit('change', this.value.concat(value));
      } else {
        this.$emit('change', this.value.filter(v => v !== value));
      }
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

  <CheckboxGroup
    v-model="radioGroupSelected"
    name="example"
    :items="[
      { display: 'One', value: 1 },
      { display: 'Two', value: 2 },
      { display: 'Three', value: 3 }
    ]" />

  <VSpacer size="l" />

  <Heading
    font-family="museo"
    level="h4">3 Columns</Heading>

  <CheckboxGroup
    v-model="radioGroupSelected2"
    name="example2"
    :columns="3"
    :items="[
      { display: 'One', value: 1 },
      { display: 'Two', value: 2 },
      { display: 'Three', value: 3 }
    ]" />
</div>
</template>
<script>
export default {
  data() {
    return {
      radioGroupSelected: [2],
      radioGroupSelected2: [1, 3],
    }
  }
};
</script>
```
</docs>
