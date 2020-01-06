<template>
  <div :class="b().toString()">
    <div
      v-for="item in items"
      :key="item.value"
      :class="b('label').toString()">
      <span
        v-if="item.state === true"
        :class="[b('icon', { state: 'tick' }).toString()]">
        <Icon
          name="check-green" />
      </span>
      <span
        v-if="item.state === false"
        :class="[b('icon', { state: 'exclamation' }).toString()]">
        <Icon
          name="exclamation" />
      </span>
      <Heading
        :class="b('text').toString()"
        level="h4"
        line-height="compact">
        {{ item.value }}
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
     * show the state and a value.
     * `[{ state: true, value: 'Good with Dogs' }]`
     */
    items: {
      type: Array,
      default() { return []; },
      validator: items => items.every(item => ('state' in item) && ('value' in item)),
    },
  },
};
</script>

<docs>
```jsx
<div>
  <Heading
    level='h3'
    font-family='special'
    font-weight='bold'
    line-height='compact'>My Info</Heading>

  <StatusList
    :items="[
      { state: true, value: 'Neutered' },
      { state: true, value: 'Shots Up to Date' },
      { state: true, value: 'House-trained' },
      { state: true, value: 'Needs Experienced Adopter' },
      { state: false, value: 'Not Good with Cats' },
      { state: true, value: 'Good with Dogs' },
      { state: true, value: 'Good with Kids' },
    ]">
  </StatusList>
</div>
```
</docs>
