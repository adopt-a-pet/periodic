<template src="./Modal.html" />
<script src="./Modal.js"></script>
<docs>
```vue
<template>
  <div>
    <Button @click="modal = true">Toggle Modal</Button>
    <Modal
      :open.sync="modal"
      size="m">
      <template slot="header">
        <span>This is in the header</span>
      </template>
      <Heading level="h1">This is the body</Heading>
      <Paragraph>{{ $filler.paragraph }}</Paragraph>
      <Paragraph>{{ $filler.paragraph }}</Paragraph>
      <Paragraph>{{ $filler.paragraph }}</Paragraph>
      <template slot="footer">
        <Icon name="search-cat" width="300" />
      </template>
    </Modal>
  </div>
</template>

<script>

export default {
  data() {
    return {
      modal: false, // Change this to true to open the modal
    };
  }
};
</script>
```
</docs>
