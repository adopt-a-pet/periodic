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
  name: 'Dropdown',
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
     * Is this dropdown searchable?
     */
    search: {
      type: Boolean,
      default: false,
    },
    /**
     * Size of the dropdown
     */
    size: {
      type: String,
      default: 'large',
      validator: value => value.match(/(small|large)/),
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
      type: [String, Number],
      default: null,
    },
    /**
     * Change border color on focus
     */
    focusBorder: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      full: false,
      // focused is only used when search=true. It should stay false otherwise.
      focused: false,
      filter: '',
      selectedIndex: this.initialSelection(),
    };
  },

  computed: {
    selectedValue() {
      const selectedItem = this.allChoices[this.selectedIndex];
      return selectedItem ? selectedItem.value : null;
    },

    selectedDisplay() {
      if (!(this.items && this.items.length)) return 'Loading...';

      const selectedItem = this.allChoices[this.selectedIndex];
      return selectedItem ? String(selectedItem.display) : null;
    },

    filterOrselectedDisplay() {
      return (
        this.focused
          ? this.filter
          : this.selectedDisplay
      );
    },

    readonly() { return !this.search; },

    choices() {
      return (
        (this.search && this.filter !== '')
          ? this.filterSearch(this.filter)
          : this.allChoices
      );
    },

    allChoices() {
      return this.makeChoices(this.items);
    },

    native() {
      // Native dropdowns on non-desktop
      return (!this.search) && (this.layout !== 'tablet-wide');
    },

  },

  watch: {
    value() {
      this.selectedIndex = this.initialSelection();
    },

    selectedIndex() {
      /**
       * Change event
       *
       * @event change
       * @type Any
       */
      this.$emit('change', this.selectedValue);
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

    initialSelection() {
      const withSpecialChoices = this.makeChoices(this.items);
      const selection = withSpecialChoices.find(choice => choice.value === this.value);

      return selection ? selection.index : null;
    },

    onSelect(index) {
      this.selectedIndex = index;
      this.hide();
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
      return choices.map(({ value, display }, i) => ({
        value,
        display: String(display),
        index: i,
      }));
    },

    isOptionSelected(option) {
      return this.selectedIndex === option.index;
    },
  },

};
