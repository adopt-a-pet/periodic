<template>
  <ul
    :class="b().toString()"
    :style="gridStyles">
    <li
      v-for="(item, index) in renderItems"
      :id="item.id"
      :key="index"
      @click="onCheck(item.value, !boxChecked(item))">
      <span :class="b('color', { checked: boxChecked(item) }).toString()" />
      <span :class="b('label').toString()">{{ item.display }}</span>
    </li>
  </ul>
</template>
<script>
import CheckboxGroup from '@/elements/CheckboxGroup';
import tokens from '@/assets/tokens/tokens.json';

/**
 * Render a set of selectable colors where the v-model is an array of checked values
 */
export default {
  name: 'ColorSelect',
  extends: CheckboxGroup,
  status: 'under-review',
  release: '1.0.0',
  blockName: 'colorselect',
  model: {
    event: 'change',
    prop: 'value',
  },
  props: {
    /**
     * Name of the IDs the form.
     */
    name: {
      type: String,
      default: 'colorselect',
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
     * The values of the selected items.
     * @model
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
  /**
   * Change event. This comes from the `onCheck` method in `CheckboxGroup`.
   *
   * @event change
   * @type Array
   */
  methods: {
    checkboxId(item) {
      return `${tokens.prefix_component}colorselect-${this.name}-item-${item.value}`;
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

  <ColorSelect
    v-model="colorSelectSelected"
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

  <ColorSelect
    v-model="colorSelectSelected2"
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
      colorSelectSelected: [2],
      colorSelectSelected2: [1, 3],
    }
  }
};
</script>
```
</docs>
