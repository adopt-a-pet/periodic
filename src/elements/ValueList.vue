<template>
  <div :class="b().toString()">
    <slot name="header" />
    <div :class="b('content').toString()">
      <div
        v-for="items in items"
        :key="items.label"
        :class="[b('content--section').toString(), {'periodic-pet-facts__content--full-width': fullWidth }]">
        <div
          :class="[
            b('label').toString(),
            'periodic-heading__h5',
            'periodic-heading__h5--bold',
            'periodic-heading__h5--compact',
            { 'periodic-pet-facts__label--full-width': fullWidth }
        ]">
          {{ items.label }}
        </div>
        <div
          :class="[
            'periodic-heading__h5',
            'periodic-heading__h5--light',
            'periodic-heading__h5--compact',
            {'periodic-pet-facts__text--full-width': fullWidth }
        ]">
          {{ items.value }}
        </div>
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
  blockName: 'pet-facts',
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
      fullWidth="true">
      <template slot="header">
        <h3 class="
          periodic-heading--no-bottom-m
          periodic-heading__h3
          periodic-heading__h3--bold
          periodic-heading__h3--museo
          periodic-heading__h3--compact">
          Facts About Me
        </h3>
      </template>
    </ValueList>
  </div>
  ```
</docs>
