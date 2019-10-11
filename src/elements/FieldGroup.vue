<template>
  <div :class="b().toString()">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FieldGroup',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'field-group',
};
</script>

<docs>
  ```jsx
  <FieldGroup>
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
    <TextInput
      v-model="textInput3"
      label="First Name"/>
    <Button>Default</Button>
  </FieldGroup>
  ```
</docs>
