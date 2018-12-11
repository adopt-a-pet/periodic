<template>
  <div
    v-if="native"
    :class="b({ native: true }).toString()">

    <TextInput
      :error-state="errorState"
      :error-message="errorMessage"
      :focus-border="false"
      :label="label"
      :label-right="labelRight"
      value=" "
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
    :class="b().is({ full: full }).toString()">

    <TextInput
      :error-state="errorState"
      :error-message="errorMessage"
      :focus-border="false"
      :label="label"
      :readonly="readonly"
      :value="filterOrselectedDisplay"
      :label-right="labelRight"
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
  },
  props: {
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
    },
    /**
     * Special choices always appear at the top of the list and are never
     * filtered out in searchable dropdowns.
     */
    specialChoices: {
      type: Array,
      default: () => [],
    },
    /**
     * Is this dropdown searchable?
     */
    search: {
      type: Boolean,
      default: false,
    },
    /**
     * Which option is selected initially
     */
    startingIndex: {
      type: Number,
      default: 0,
    },
    /**
     * If a value is passed, show the info bubble
     */
    tooltip: {
      type: String,
      default: null,
    },
    /**
     * Does the field have any validation errors?
     */
    errorState: {
      type: Boolean,
      default: false,
    },
    /**
     * If `errorState` is `true` what error message to show
     */
    errorMessage: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      full: false,
      // focused is only used when search=true. It should stay false otherwise.
      focused: false,
      filter: '',
      selectedIndex: this.initialSelection().index,
      showBreedpopup: false,
    };
  },

  computed: {
    selectedValue() {
      const selectedItem = this.allChoices[this.selectedIndex];
      return selectedItem.value;
    },

    selectedDisplay() {
      const selectedItem = this.allChoices[this.selectedIndex];
      return selectedItem.display;
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
    selectedIndex() {
      this.$emit('change', this.selectedValue);
    },
  },

  mounted() {
    this.$emit('change', this.selectedValue);
  },

  methods: {
    // Design team requires an `Any` option to be at the top of the list.
    // This is a problem because when using Fuse the ordering can't be
    // guaranteed. So we use `specialChoicesBeginning` to add items to the
    // list *after* the Fuse filtering happens.
    makeChoices(items) {
      const withSpecialChoices = this.specialChoices.concat(items);
      return this.addIndexes(withSpecialChoices);
    },

    initialSelection() {
      const withSpecialChoices = this.makeChoices(this.items);
      return withSpecialChoices[this.startingIndex];
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
      return choices.map((choice, i) => Object.assign({ index: i }, choice));
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
  ```jsx
  <div>
    <Dropdown
      label="Without Search"
      label-right="Right Label"
      :items="[
        { display: 'One', value: 1 },
        { display: 'Two', value: 2 },
      ]" />

    <br />

    <Dropdown
      label="With Search"
      :items="[
        { display: 'One', value: 1 },
        { display: 'Two', value: 2 },
      ]"
      :search="true"
      :specialChoices="[{ display: 'Any', value: null }]"
      tooltip="This is an info bubble" />

    <br />

    <Dropdown
      label="Error State"
      :error-state="true"
      error-message="Nope!"
      :items="[
        { display: 'One', value: 1 },
        { display: 'Two', value: 2 },
      ]" />
  </div>
  ```
</docs>
