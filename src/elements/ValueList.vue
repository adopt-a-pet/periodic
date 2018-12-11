<template>
  <div :class="b().toString()">
    <div :class="b('content').toString()">
      <div
        v-for="items in items"
        :key="items.label"
        :class="[b('item', { 'full-width': fullWidth }).toString()]">

        <Heading
          :class="b('label', { 'full-width': fullWidth }).toString()"
          level="h5"
          font-weight="bold"
          line-height="compact">
          {{ items.label }}
        </Heading>

        <Heading
          :class="[b('text', { 'full-width': fullWidth }).toString()]"
          level="h5"
          font-weight="light"
          line-height="compact">
          {{ items.value }}
        </Heading>
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
     * The value to be displayed. Each item must have one label and one value.
     * `[{ label: 'Age', value: 'Adult' }]`
     */
    items: {
      type: Array,
      default() { return []; },
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
    font-family='museo'
    font-weight='bold'
    line-height='compact'>Facts About Me</Heading>

  <ValueList
    :items="[
      { label: 'Breed:', value: 'Greyhound' },
      { label: 'Color:', value: 'Brindle' },
      { label: 'Age:', value: 'Adult' },
      { label: 'Size:', value: '(when grown) Med. 26-60 lbs (12-27 kg)' },
      { label: 'Weight:', value: '(current weight) 70 lbs' },
      { label: 'Sex:', value: 'Male' },
      { label: 'Pet ID:', value: '' },
    ]"
    :full-width="true">
  </ValueList>
</div>
```
</docs>
