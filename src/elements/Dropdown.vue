<template>
  <div
    v-if="native"
    :class="b().toString()">

    <select
      v-model="selectedNative"
      :class="b().is({ 'is-error': hasErrors }).toString()"
      @change="onSelectNative">

      <option
        v-for="option in choices"
        :key="option.display"
        :value="option.index">{{ option.display | capitalize }}</option>
    </select>

    <span class="form__arrow" />
  </div>

  <div
    v-else
    :class="b().is({ full: full }).toString()">

    <TextInput
      ref="input"
      :focus-border="false"
      :label="label"
      :readonly="readonly"
      :value="filterOrselectedDisplay"
      @blur="onBlur"
      @click="toggle"
      @focus="onFocus"
      @input="setFilter" />

    <span
      v-if="!search"
      :class="b('arrow').toString()"
      @click="toggle" />

    <div
      :class="b('list').toString()">

      <ul
        @mouseleave="onMouseout">
        <li
          v-for="option in choices"
          :key="option.display"
          :class="b('list-item').is({ selected: (selectedIndex === option.index) }).toString()"
          @mousedown="e => onSelect(e, option)">{{ option.display | capitalize }}</li>
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
    label: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    search: {
      type: Boolean,
      default: false,
    },
    startingIndex: {
      type: Number,
      default: 0,
    },
    allowChoiceOfAny: {
      type: Boolean,
      default: true,
    },
    parentErrors: {
      type: Array,
      default() {
        return [];
      },
    },
    showErrorMessages: {
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
      // Some sequencing issue with the computed this.choices, so using `addIndexes` directly
      selected: this.initialSelection(),
      selectedNative: this.initialSelection().index,
      showBreedpopup: false,
    };
  },

  computed: {
    selectedValue() {
      const selectedItem = this.selected;
      return selectedItem.value;
    },

    selectedDisplay() {
      const selectedItem = this.selected;
      return selectedItem.display;
    },

    selectedIndex() {
      const selectedItem = this.selected;
      return selectedItem.index;
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
          : this.makeChoices(this.items)
      );
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
      return this.layout !== 'desktop';
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
      const withSpecialChoices = this.specialChoicesBeginning().concat(items);
      return this.addIndexes(withSpecialChoices);
    },

    // Add custom options to always appear at the beginning of the list.
    // It would be possible to make this more configurable in the future,
    // but there is not a need currently.
    specialChoicesBeginning() {
      // Extend this list to add choices
      const choices = [];

      if (this.allowChoiceOfAny) choices.push({ display: 'Any', value: null });

      return choices;
    },

    initialSelection() {
      const withSpecialChoices = this.makeChoices(this.items);
      return withSpecialChoices[this.startingIndex];
    },

    onSelectNative({ target: { value } }) {
      const selected = this.choices[value].value;

      this.$emit('change', selected);
    },

    onSelect(e, option) {
      this.selected = option;
      this.hide();
      this.$emit('change', this.selectedValue);
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

    // This is a little ugly but it's the only way I could make it work...
    //
    // 1. `makeChoices(this.items)` to add indexes to everything, including
    //    the special ones at the beginning ("Any").
    // 2. Split the list into special and normal
    // 3. Search through all the normal ones
    // 4. Add special items back to the beginning and return the whole list
    filterSearch(filter) {
      const list = this.makeChoices(this.items);
      const specialChoicesBeginningSize = this.specialChoicesBeginning().length;
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

    resetSelection() {
      this.selected = this.initialSelection();
      this.selectedNative = this.initialSelection().index;

      this.$emit('change', this.selectedValue);
    },

  },

};
</script>

<docs>
  ```jsx
  <div>
    <Dropdown
      label="Without Search"
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
      :allowChoiceOfAny="true" />
  </div>
  ```
</docs>
