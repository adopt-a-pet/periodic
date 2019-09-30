<template>
  <ul
    :class="b().toString()"
    :style="gridStyles">
    <li
      v-for="(item, index) in renderItems"
      :id="item.id"
      :key="index"
      @click="onCheck(item.value, !boxChecked(item))">
      <span :class="b('color-sample', { checked: boxChecked(item), color: item.color }).toString()" />
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
     * `[ { display: 'Green', value: 123, color: 'Brown' } ]`
     */
    items: {
      type: Array,
      default: () => [],
      validator: items => items.every(item =>
        ('display' in item) && ('value' in item) && ('color' in item),
      ),
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
    level="h4">Dogs</Heading>
  <VSpacer />
  <ColorSelect
    v-model="colorSelectSelected2"
    name="example2"
    :columns="1"
    :items="[
      { display: 'Black', value: 152, color: 'dogs-black' },
      { display: 'Brindle', value: 153, color: 'dogs-brindle' },
      { display: 'Brown/Chocolate', value: 154, color: 'dogs-brown' },
      { display: 'Gray/Blue/Silver/Salt & Pepper', value: 155, color: 'dogs-gray' },
      { display: 'Merle', value: 156, color: 'dogs-merle' },
      { display: 'Red/Golden/Orange/Chestnut', value: 157, color: 'dogs-red' },
      { display: 'Silver & Tan (Yorkie Colors)', value: 158, color: 'dogs-silver' },
      { display: 'Tan/Yellow/Fawn', value: 159, color: 'dogs-tan' },
      { display: 'Tricolor (Tan/Brown and Black & White)', value: 160, color: 'dogs-tricolor' },
      { display: 'White', value: 161, color: 'dogs-white' }
    ]" />
  <VSpacer size="l" />
  <Heading
    font-family="museo"
    level="h4">Cats</Heading>
  <VSpacer />
  <ColorSelect
    v-model="colorSelectSelected2"
    name="example2"
    :columns="1"
    :items="[
      { display: 'Black', value: 46, color: 'cats-black' },
      { display: 'Black & White, or Tuxedo', value: 47, color: 'cats-tuxedo' },
      { display: 'Brown or Chocolate', value: 48, color: 'cats-brown' },
      { display: 'Brown Tabby', value: 49, color: 'cats-brown-tabby' },
      { display: 'Calico or Dilute Calico', value: 50, color: 'cats-calico' },
      { display: 'Cream or Ivory', value: 51, color: 'cats-cream' },
      { display: 'Gray, Blue or Silver Tabby', value: 53, color: 'cats-silver-tabby' },
      { display: 'Gray or Blue', value: 52, color: 'cats-gray' },
      { display: 'Orange or Red', value: 54, color: 'cats-orange' },
      { display: 'Orange or Red Tabby', value: 55, color: 'cats-red-tabby' },
      { display: 'Spotted Tabby/Leopard Spotted', value: 56, color: 'cats-spotted' },
      { display: 'Tabby', value: 61, color: 'cats-tabby' },
      { display: 'Tan or Fawn', value: 57, color: 'cats-tan' },
      { display: 'Tan or Fawn Tabby', value: 58, color: 'cats-fawn-tabby' },
      { display: 'Tiger-striped', value: 163, color: 'cats-tiger' },
      { display: 'Tortoiseshell', value: 59, color: 'cats-tortoise' },
      { display: 'White', value: 60, color: 'cats-white' }
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
