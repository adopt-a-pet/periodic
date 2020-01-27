import Fuse from 'fuse.js';

const fuseOptions = {
  findAllMatches: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'display',
  ],
};

export default {
  name: 'DropdownMulti',
  blockName: 'dropdown',
  status: 'under-review',
  release: '1.0.0',
  model: {
    event: 'change',
    prop: 'value',
  },
  props: {
    /**
     * Name input field in the form.
     */
    name: {
      type: String,
      default: null,
    },
    /**
     * The label of the form input field.
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * The label for the right side of the dropdown.
     */
    labelRight: {
      type: String,
      default: null,
    },
    /**
     * A list of items to render. Each item must have a `display` and a `value`.
     *
     * `[{ display: 'One', value: 1 }]`
     */
    items: {
      type: Array,
      default: () => [],
      validator: items => items.every(item => ('display' in item) && ('value' in item)),
    },
    /**
     * Special choices always appear at the top of the list and are never
     * filtered out in searchable dropdowns.
     */
    specialChoices: {
      type: Array,
      default: () => [],
      validator: items => items.every(item => ('display' in item) && ('value' in item)),
    },
    /**
     * Is this dropdown searchable?
     */
    search: {
      type: Boolean,
      default: false,
    },
    /**
     * If a value is passed, show the info bubble
     */
    tooltip: {
      type: String,
      default: null,
    },
    /**
     * Value of the selected item.
     */
    value: {
      type: Array,
      default: () => [],
    },
    /**
     * Change border color on focus
     */
    focusBorder: {
      type: Boolean,
      default: true,
    },
    /**
     * Change the label when nothing is selected. This is almost the same as
     * the `label` prop, except it's going to show up darker.
     */
    zeroSelectedLabel: {
      type: String,
      default: '',
    },
    /**
     * Change the label when more than 1 is selected. This is useful when showing
     * the values of every selection can take too much space.
     */
    multiSelectedLabel: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      full: false,
      // focused is only used when search=true. It should stay false otherwise.
      focused: false,
      filter: '',
    };
  },

  computed: {
    allChoices() { return this.makeChoices(this.items); },
    selectedDisplay() {
      if (!(this.value && this.value.length)) {
        return this.zeroSelectedLabel || '';
      }

      if (this.value.length > 1 && this.multiSelectedLabel) return this.multiSelectedLabel;
      if (!(this.items && this.items.length)) return 'Loading...';

      return this.value
        .map(selectedValue =>
          this.allChoices.find(choice => choice.value === selectedValue).display,
        )
        .join(', ');
    },

    filterOrselectedDisplay() {
      return (
        this.focused
          ? this.filter
          : this.selectedDisplay
      );
    },

    choices() {
      return (
        (this.search && this.filter !== '')
          ? this.filterSearch(this.filter)
          : this.allChoices
      );
    },
  },

  methods: {
    // Design team requires an `Any` option to be at the top of the list.
    // This is a problem because when using Fuse the ordering can't be
    // guaranteed. So we use `withSpecialChoices` to add items to the
    // list *after* the Fuse filtering happens.
    makeChoices(items) {
      const withSpecialChoices = this.specialChoices.concat(items);
      return this.addIndexes(withSpecialChoices);
    },

    onSelect({ value: selected }) {
      /**
       * Change event
       *
       * @event change
       * @type Array
       */
      if (this.value.includes(selected)) {
        this.$emit('change', this.value.filter(v => v !== selected));
      } else {
        this.$emit('change', this.value.concat(selected));
      }
    },

    onBlur() {
      this.focused = false;
      this.hide();
    },

    onFocus() {
      if (!this.search) return;

      this.setFilter('');
      this.focused = true;
      this.showFull();
    },

    setFilter(value) {
      this.filter = value.trim();
    },

    // This is a little ugly but...
    //
    // 1. `makeChoices(this.items)` to add indexes to everything, including
    //    the special ones at the beginning
    // 2. Split the list into special and normal
    // 3. Search through all the normal ones
    // 4. Add special items back to the beginning and return the whole list
    filterSearch(filter) {
      const list = this.makeChoices(this.items);
      const specialChoicesBeginningSize = this.specialChoices.length;
      const specialChoicesBeginning = list.slice(0, specialChoicesBeginningSize);
      const filterChoices = list.slice(specialChoicesBeginningSize);
      const fuse = new Fuse(filterChoices, fuseOptions);

      return specialChoicesBeginning.concat(fuse.search(filter));
    },

    toggle() {
      if (this.search) return;

      if (this.full) this.hide();
      else this.showFull();
    },
    hide() {
      this.full = false;
      this.filter = '';
    },
    showFull() { this.full = true; },

    focusInput() { this.$refs.input.focus(); },

    addIndexes(choices) {
      return choices.map((choice, i) => ({ ...choice, index: i }));
    },

    isOptionSelected({ value: optionValue }) {
      return this.value.includes(optionValue);
    },
  },

};
