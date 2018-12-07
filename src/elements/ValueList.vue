<template>
  <div :class="b().toString()">
    <slot name="header" />
    <div :class="b('content').toString()">
      <div
        v-for="items in items"
        :key="items.label"
        :class="b('content--section').toString()">
        <div :class="[b('label').toString(), 'h4__heading', 'h4--bold', 'h4--compact']">
          {{ items.label }}
        </div>
        <div class="h4__heading h4--light h4--compact">
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
  },
};
</script>

<docs>
  ```jsx
  <div>
    <ValueList
      :items="[
        { label: 'Age:', value: 'Adult' },
        { label: 'Sex:', value: 'Male' },
        { label: 'Breed:', value: 'Greyhound' },
        { label: 'Size:', value: 'Large' },
      ]">
      <template slot="header">
        <span>Facts About Me</span>
      </template>
    </ValueList>
  </div>
  ```
</docs>
