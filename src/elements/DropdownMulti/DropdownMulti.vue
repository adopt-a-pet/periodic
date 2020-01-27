<template src="./DropdownMulti.html" />
<script src="./DropdownMulti.js" />
<docs>
```vue
<template>
  <div>
    <DropdownMulti
      label="Without Search"
      label-right="Right Label"
      zero-selected-label="Any"
      multi-selected-label="Multiple"
      v-model="dropdown1"
      :items="[
        { display: 'One', value: 1, labelRight: '(3)' },
        { display: 'Two', value: 2, labelRight: '(1)' },
      ]" />

    <br />

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
  </div>
</template>
<script>
export default {
  data() {
    return {
      dropdown1: [],
      dropdown2: [2,3],
    }
  }
};
</script>
```
</docs>
