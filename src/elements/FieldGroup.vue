<template>
  <div :class="b({ native: true }).toString()">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FieldGroup',
  blockName: 'fieldgroup',
  status: 'under-review',
  release: '1.0.0',
};
</script>

<docs>
```vue
<template>
  <FieldGroup>
    <Dropdown label="Types of Pets" v-model="type" :items="[
      { display: 'Dog', value: 'dog' },
      { display: 'Cat', value: 'cat' },
    ]" />
    <Dropdown label="Age" v-model="age" :items="[
      { display: 'Young', value: 'young' },
      { display: 'Adult', value: 'adult' },
      { display: 'Senior', value: 'senior' },
    ]" />
    <Dropdown label="Sex" v-model="sex" :items="[
      { display: 'Any', value: '' },
      { display: 'Male', value: 'male' },
      { display: 'Female', value: 'female' },
    ]" />
  </FieldGroup>
</template>
<script>
export default {
  data() {
    return {}
  }
};
</script>
```
</docs>
