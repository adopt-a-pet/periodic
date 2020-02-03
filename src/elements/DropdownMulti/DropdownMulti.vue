<template src="./DropdownMulti.html" />
<script src="./DropdownMulti.js" />
<docs>
```vue
<template>
  <div>
    <DropdownMulti
      v-model="dropdown1"
      :auto-close="true"
      :items="[
        { display: 'One', value: 1, labelRight: '(3)' },
        { display: 'Two', value: 2, labelRight: '(1)' },
      ]"
      label="Without Search"
      label-right="Right Label"
      zero-selected-label="Any"
      multi-selected-label="Multiple"
       />

    <br />

    <DropdownMulti
      v-model="dropdown2"
      :auto-close="true"
      :items="[
        { display: 'One', value: 1, labelRight: '(0)' },
        { display: 'Two', value: 2, labelRight: '(2)' },
        { display: 'Three', value: 3, labelRight: '(5)' },
        { display: 'Four', value: 4, labelRight: '(1)' },
      ]"
      :search="true"
      label="With Search"
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
