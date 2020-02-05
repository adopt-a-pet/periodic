/**
 * A reusable, highly-styled modal component
 */
export default {
  name: 'Modal',
  blockName: 'modal-popup',
  status: 'under-review',
  release: '1.0.0',
  props: {
    /**
     * ID (this is passed to child components, allowing for the assignment of
     * unique ID's. This is useful, for example, if your modal has multiple sections,
     * and as you navigate between them, you want to be automatically scrolled
     * to the top of the section. Doing so requires selecting an element's unique ID.)
     */
    id: {
      type: String,
      default: null,
    },

    /**
     * Max width of the modal
     */
    maxWidth: {
      type: String,
      default: null,
    },

    /**
     * Should the modal be open or closed.
     */
    open: {
      type: Boolean,
      default: true,
    },

    /**
     * The size of the modal's content (m/l)
     */
    size: {
      type: String,
      default: 'm',
      validator: value => value.match(/(m|l)/),
    },
  },
  methods: {
    close() {
      /**
       * Modal closed
       *
       * @event close
       * @type none
       */
      this.$emit('close');

      /**
       * Same as `@close` but allows components to use `:open.sync=""`
       *
       * @event update:open
       * @type Boolean
       */
      this.$emit('update:open', false);
    },
  },
};
