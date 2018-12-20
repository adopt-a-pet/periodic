<template>
  <div :class="b('content').toString()">
    <div
      v-for="items in items"
      v-if="items.show"
      :key="items.value"
      :class="b('label').toString()">
      <span
        v-if="items.state === true"
        :class="[b('icon', { state: 'tick' }).toString()]" />
      <span
        v-if="items.state === false"
        :class="[b('icon', { state: 'exclamation' }).toString()]" />
      <Heading
        :class="b('text').toString()"
        level="h4"
        line-height="compact">{{ items.value }}
      </Heading>
    </div>
  </div>
</template>

<script>
/**
 * A Status list is a list of traits with either a checkmark or an exclamation point icon beside
 * them. An example of this is the 'My Info' section on the Pet Details Page.
 */
export default {
  name: 'StatusList',
  blockName: 'status-list',
  status: 'review',
  release: '1.0.0',
  props: {
    /**
     * The values to be displayed. Each item must have a checkmark or an exclamation point icon to
     * show the state, a value, and a booleen for visility.
     * `[{ state: true, value: 'Good with Dogs', show: true }]`
     */
    items: {
      type: Array,
      default() { return []; },
      validator: items => items.every(item => ('state' in item) && ('value' in item) && ('show' in item)),
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
    line-height='compact'>My Info</Heading>

  <StatusList
    :items="[
      { state: true, value: 'Neutered', show: true },
      { state: true, value: 'Shots Up to Date', show: true },
      { state: true, value: 'House-trained', show: true },
      { state: true, value: 'Needs Experienced Adopter', show: false },
      { state: false, value: 'Not Good with Cats', show: true },
      { state: true, value: 'Good with Dogs' , show: true},
      { state: true, value: 'Good with Kids', show: true },
    ]">
  </StatusList>
</div>
```
</docs>
