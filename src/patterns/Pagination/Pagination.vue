<template src="./Pagination.html" />
<script src="./Pagination.js"></script>
<docs>
  ```vue
  <template>
    <Pagination :limit="limit"
      :record-count="recordCount"
      :starting-page="startingPage"
      ref="pagination"
      @onPageChange="changePage" />
  </template>
  <script>
  export default {
    data() {
      return {
        limit: 20,
        loading: false,
        startingPage: 2,
        recordCount: 50, // this will likely be obtained from an API
      }
    },
    methods: {
      /**
       * An example method for changing the page
       */
      changePage(event) {
        this.loading = true;
        // execute a new query
        this.$syscall('api/shelters/getShelterPets', {
          limit: 20,
          shelterId: 12345,
          // a property sent from the Pagination pattern, indicating which page
          // to pull data from
          start: event.newStart,
        }).then(() => {
          // after the new page has been loaded, you'll likely want to scroll to
          // the top of the results
          this.$scrollTo('#top-of-results');
          this.loading = false;
          // tell the Pagination component that the loading is complete
          this.$refs.pagination.onPageLoad();
        });
      },
    },
  }
  </script>
  ```
</docs>
