export default {
  name: 'Pagination',
  blockName: 'pagination',
  status: 'under-review',
  release: '1.0.0',
  props: {
    /**
     * The number of records shown per page
     */
    limit: {
      type: Number,
      default: 20,
    },

    /**
     * The total number of records
     */
    recordCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      newPage: null,
      newStart: null,
      page: 1,
      popupIsOpen: false,
      start: 1,
    };
  },
  computed: {
    /**
     * Pet results end
     */
    end() {
      let end = this.start + (this.limit - 1);
      end = end > this.recordCount ? this.recordCount : end;
      return end;
    },

    /**
     * Pet results page count
     */
    pageCount() {
      return Math.ceil(this.recordCount / this.limit);
    },

    /**
     * Pet results pages
     */
    pages() {
      const pages = [];
      for (let page = 1; page <= this.pageCount; page += 1) {
        pages.push(page);
      }
      return pages;
    },
  },
  methods: {
    /**
     * Change results page
     */
    changePage(direction, page) {
      if (page) {
        this.newStart = (page * this.limit) - this.limit + 1;
        this.newPage = page;
        this.pageSelected(this.newPage);
      } else {
        if (direction === 'forward') {
          this.newStart = this.start + this.limit;
          this.newPage = this.page + 1;
          this.nextPage();
        } else {
          this.newStart = this.start - this.limit;
          this.newPage = this.page - 1;
          this.previousPage();
        }
        if (this.newStart < 1 || this.newStart >= this.recordCount) {
          return;
        }
      }
      this.loading = true;
      this.popupIsOpen = false;
      this.$emit('onPageChange', { newStart: this.newStart });
    },

    pageSelector() {
      /**
       * When user clicks on the page selector
       *
       * @event pageSelector
       * @type none
       */
      this.$emit('pageSelector');
    },

    pageSelected(page) {
      /**
       * When user selects a page from the popup menu
       *
       * @event pageSelected
       * @type none
       */
      this.emit('pageSelected', { page });
    },

    nextPage() {
      /**
       * When user clicks on the next page button
       *
       * @event nextPage
       * @type none
       */
      this.$emit('nextPage');
    },

    previousPage() {
      /**
       * When user clicks on the prevous page button
       *
       * @event previousPage
       * @type none
       */
      this.$emit('previousPage');
    },
    /**
     * onNewPage
     */
    onNewPage() {
      this.loading = false;
      this.page = this.newPage;
      this.start = this.newStart;
    },
  },
};
