<template>
  <div :class="b().toString()">
    <div :class="['content', format]">
      <div
        v-for="items in items"
        :key="items.label"
        :class="['item', format, { 'full-width': fullWidth }]">
        <Heading
          :class="['label', format, { 'full-width': fullWidth }]"
          level="h5"
          font-weight="bold"
          line-height="compact">
          {{ items.label }}<span v-if="format === 'list'">:</span>
        </Heading>

        <span
          :class="['text', { 'full-width': fullWidth }]"
          :style="{ 'font-weight': $font_weight_light }"
          line-height="compact">
          <span v-html="items.value" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * A Value List is a list of key/value pairs displayed on a page.  An example of this is the
 * 'Facts About Me' section on the Pet Details Page.
 */
export default {
  name: 'ValueList',
  blockName: 'value-list',
  status: 'review',
  release: '1.0.0',
  props: {
    /**
     * Display format (table|list)
     */
    format: {
      type: String,
      default: 'table',
      validator: value => value.match(/(table|list)/),
    },

    /**
     * The value to be displayed. Each item must have one label and one value.
     * `[{ label: 'Age', value: 'Adult' }]`
     */
    items: {
      type: Array,
      default() { return []; },
      validator: items => items.every(item => ('label' in item) && ('value' in item)),
    },

    /**
     * If the label and the value should each take up a full line a this should be true.  By default the
     * label and the value will be on the same line.
     */
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<docs>
```jsx
<div>
  <Heading
    level='h3'
    font-weight='bold'
    line-height='compact'
    style="margin-bottom: 0">Facts about me</Heading>

  <ValueList
    :items="[
      { label: 'Breed', value: 'Greyhound' },
      { label: 'Color', value: 'Brindle' },
      { label: 'Age', value: 'Adult' },
      { label: 'Size', value: '(when grown) Med. 26-60 lbs (12-27 kg)' },
      { label: 'Weight', value: '(current weight) 70 lbs' },
      { label: 'Sex', value: 'Male' },
      { label: 'Pet ID', value: '' },
    ]"
    :full-width="true"
    format="list">
  </ValueList>
</div>
```
</docs>
