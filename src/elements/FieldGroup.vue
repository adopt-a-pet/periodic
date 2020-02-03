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
  <script>
    export default {
      data() {
        return {
          dropdown: [1, 3],
          textInput: '',
        }
      }
    };
  </script>
  <template>
    <FieldGroup>
      <DropdownMulti
        label="With search"
        v-model="dropdown"
        :items="[
          { display: 'One', value: 1, labelRight: '(0)' },
          { display: 'Two', value: 2, labelRight: '(2)' },
          { display: 'Three', value: 3, labelRight: '(5)' },
          { display: 'Four', value: 4, labelRight: '(1)' },
        ]"
        :search="true" />
      <TextInput
        v-model="textInput"
        label="First name"/>
      <Button>Submit</Button>
    </FieldGroup>
  </template>
  ```
</docs>
