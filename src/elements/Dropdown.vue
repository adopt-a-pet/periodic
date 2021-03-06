<template>
  <div
    v-if="native"
    :class="b({ native: true }).toString()">
    <TextInput
      ref="input"
      :label="label"
      :label-right="labelRight"
      :value="selectedDisplay"
      :error-messages="errorMessages"
      :required="required"
      autocomplete="off"
      focus-border
      readonly>
      <template slot="right">
        <Tooltip
          v-if="tooltip"
          :class="b('tooltip').toString()">
          {{ tooltip }}
        </Tooltip>

        <span
          :class="b('arrow').toString()"
          @click="toggle" />
      </template>
    </TextInput>

    <select
      v-model.number="selectedIndex"
      :class="b('select').toString()"
      :name="name"
      @blur="validate">
      <option
        v-for="option in choices"
        :key="option.display"
        :value="option.index">
        {{ option.display | capitalize }}
      </option>
    </select>
  </div>

  <div
    v-else
    :class="b({ searchable: search }).is({ full: full }).toString()">
    <TextInput
      ref="input"
      :label="label"
      :name="name"
      :readonly="readonly"
      :value="filterOrselectedDisplay"
      :label-right="labelRight"
      :size="size"
      :error-messages="errorMessages"
      :required="required"
      autocomplete="off"
      focus-border
      @blur="onBlur"
      @click="toggle"
      @focus="onFocus"
      @input="setFilter">
      <template slot="right">
        <Tooltip v-if="tooltip">
          {{ tooltip }}
        </Tooltip>

        <span
          :class="b('arrow').toString()"
          @click="toggle" />
      </template>
    </TextInput>

    <div
      :class="b('list').toString()">
      <ul>
        <li
          v-for="option in choices"
          :key="option.display"
          :class="b('list-item').is({ selected: isOptionSelected(option) }).toString()"
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

    /**
     * Whether the form field is required or not.
     */
    required: {
      type: Boolean,
      default: false,
    },

    /**
     * What error message to show for each validation error
     */
    errorMessages: {
      type: Object,
      default: () => ({}),
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
      this.validate();
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

    async validate() {
      this.$refs.input.validate();
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

    <br />

    <Dropdown
      v-model="dropdown3"
      :items="[
        { display: 'One', value: 1 },
        { display: 'Two', value: 2 },
      ]"
      :specialChoices="[{ display: 'Any', value: null }]"
      label="Small"
      size="small"
      tooltip="This is an info bubble" />

    <br />

    <Dropdown
      label="Required"
      label-right="Right Label"
      v-model="dropdown4"
      :items="[
        { display: 'One', value: 1 },
        { display: 'Two', value: 2 },
      ]"
      :error-messages="{required: 'You should select something'}"
      required />
  </div>
</template>
<script>
export default {
  data() {
    return {
      dropdown1: 2,
      dropdown2: null,
      dropdown3: 1,
      dropdown4: null
    }
  }
};
</script>
```
</docs>
