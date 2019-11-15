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
      } else {
        if (direction === 'forward') {
          this.newStart = this.start + this.limit;
          this.newPage = this.page + 1;
        } else {
          this.newStart = this.start - this.limit;
          this.newPage = this.page - 1;
        }
        if (this.newStart < 1 || this.newStart >= this.recordCount) {
          return;
        }
      }
      this.loading = true;
      this.popupIsOpen = false;
      this.$emit('onPageChange', { newStart: this.newStart });
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
