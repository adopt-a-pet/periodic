<template>
  <div
    v-if="native"
    :class="b({ native: true }).toString()">

    <TextInput
      :label="label"
      :label-right="labelRight"
      :name="name"
      :value="selectedDisplay"
      autocomplete="off"
      focus-border
      readonly>

      <template slot="right">
        <Tooltip v-if="tooltip">{{ tooltip }}</Tooltip>

        <span
          :class="b('arrow').toString()"
          @click="toggle" />
      </template>
    </TextInput>

    <select
      :class="b('select').toString()"
      v-model.number="selectedIndex">

      <option
        v-for="option in choices"
        :key="option.display"
        :value="option.index">{{ option.display | capitalize }}</option>
    </select>
  </div>

  <div
    v-else
    :class="b({ searchable: search }).is({ full: full }).toString()">

    <TextInput
      :label="label"
      :name="name"
      :readonly="readonly"
      :value="filterOrselectedDisplay"
      :label-right="labelRight"
      autocomplete="off"
      focus-border
      @blur="onBlur"
      @click="toggle"
      @focus="onFocus"
      @input="setFilter">

      <template slot="right">
        <Tooltip v-if="tooltip">{{ tooltip }}</Tooltip>

        <span
          :class="b('arrow').toString()"
          @click="toggle" />
      </template>
    </TextInput>

    <div
      :class="b('list').toString()">

      <ul
        @mouseleave="onMouseout">
        <li
          v-for="option in choices"
          :class="b('list-item').is({ selected: isOptionSelected(option) }).toString()"
          :key="option.display"
          @mousedown="e => onSelect(option.index)">

          {{ option.display | capitalize }}

          <Icon
            v-if="isOptionSelected(option)"
            :class="b('list-check').toString()"
            name="check-blue" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const Fuse = require('fuse.js');

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
      default: () => [{ display: 'Loading...', value: null }],
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
      showBreedpopup: false,
    };
  },

  computed: {
    selectedValue() {
      const selectedItem = this.allChoices[this.selectedIndex];
      return selectedItem ? selectedItem.value : null;
    },

    selectedDisplay() {
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

    // This method can be extended for any kind of errors.
    // Right now the only errors are parentErrors
    hasErrors() {
      return this.parentErrors.length;
    },

    firstErrorMessage() {
      // Right now there are only parentErrors. This would change if this
      // component also had its own errors.
      return this.parentErrors.length
        ? this.parentErrors[0].message
        : '';
    },

    native() {
      // Native dropdowns on non-desktop
      return (!this.search) && (this.layout !== 'desktop');
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

    onMouseout() {
      if (this.search) return;
      this.hide();
    },

    addIndexes(choices) {
      return choices.map(({ value, display }, i) => ({
        value,
        display: String(display),
        index: i,
      }));
    },

    breedPopup() {
      this.showBreedpopup = true;
    },

    hideBreedpopup() {
      this.showBreedpopup = false;
    },

    isOptionSelected(option) {
      return this.selectedIndex === option.index;
    },
  },

};
</script>

<docs>
```vue
<template>
  <div>
    <Dropdown
      label="Without Search"
      label-right="Right Label"
      v-model="dropdown1"
      :items="[
        { display: 'One', value: 1 },
        { display: 'Two', value: 2 },
      ]" />

    <br />

    <Dropdown
      label="With Search"
      v-model="dropdown2"
      :items="[
        { display: 'One', value: 1 },
        { display: 'Two', value: 2 },
      ]"
      :search="true"
      :specialChoices="[{ display: 'Any', value: null }]"
      tooltip="This is an info bubble" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      dropdown1: 2,
      dropdown2: null,
    }
  }
};
</script>
```
</docs>
