<template src="./Dropdown.html" />
<script src="./Dropdown.js" />
<docs>
```vue
<template>
  <div>
    <Dropdown
      label="Without Search"
      label-right="Right Label"
      v-model="dropdown1"
      :items="[
        { display: 'One', value: 1 },
        { display: 'Two', value: 2 },
      ]" />

    <br />

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

    <br />

    <Dropdown
      v-model="dropdown3"
      :items="[
        { display: 'One', value: 1 },
        { display: 'Two', value: 2 },
      ]"
      :specialChoices="[{ display: 'Any', value: null }]"
      label="Small"
      size="small"
      tooltip="This is an info bubble" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      dropdown1: 2,
      dropdown2: null,
      dropdown3: null,
    }
  }
};
</script>
```
</docs>
