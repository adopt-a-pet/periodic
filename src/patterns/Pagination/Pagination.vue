<template src="./Pagination.html" />
<script src="./Pagination.js"></script>
<docs>
  ```vue
  <template>
    <Pagination :limit="20"
      :record-count="50"
      @onPageChange="$emit('changePage')" />
  </template>
  <script>
  export default {
    data() {
      return {
        //
      }
    }
  }
  </script>
  ```
</docs>
