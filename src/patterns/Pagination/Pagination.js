export default {
  name: 'Pagination',
  blockName: 'pagination',
  status: 'under-review',
  release: '1.0.0',
  props: {
    limit: {
      type: Number,
      default: 20,
    },
    recordCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
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
      let newStart;
      let newPage;
      if (page) {
        newStart = (page * this.limit) - this.limit + 1;
        newPage = page;
      } else {
        if (direction === 'forward') {
          newStart = this.start + this.limit;
          newPage = this.page + 1;
        } else {
          newStart = this.start - this.limit;
          newPage = this.page - 1;
        }
        if (newStart < 1 || newStart >= this.recordCount) {
          return;
        }
      }
      this.$emit('onPageChange', { newPage, newStart });
    },
  },
};
