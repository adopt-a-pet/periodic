<template>
  <div :class="b().toString()">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DropdownGroup',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'dropdown-group',
};
</script>

<docs>
  ```jsx
  <DropdownGroup>
    <Dropdown
      label="Without Search"
      v-model="dropdown1"
      :items="[
        { display: 'One', value: 1 },
        { display: 'Two', value: 2 },
      ]" />
    <Dropdown
      label="With Search"
      v-model="dropdown2"
      :items="[
        { display: 'One', value: 1 },
        { display: 'Two', value: 2 },
      ]"
      :search="true"
      :specialChoices="[{ display: 'Any', value: null }]"
      tooltip="This is an info bubble" />
    <DropdownMulti
      label="With Search"
      v-model="dropdown2"
      :items="[
        { display: 'One', value: 1, labelRight: '(0)' },
        { display: 'Two', value: 2, labelRight: '(2)' },
        { display: 'Three', value: 3, labelRight: '(5)' },
        { display: 'Four', value: 4, labelRight: '(1)' },
      ]"
      :search="true"
      tooltip="This is an info bubble" />
  </DropdownGroup>
  ```
</docs>
