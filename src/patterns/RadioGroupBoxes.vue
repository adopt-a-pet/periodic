<template>
  <div>
    <ul
      :class="b().toString()"
      :style="gridStyles">
      <li
        v-for="(item, index) in renderItems"
        :id="item.id + '-parent'"
        :key="index"
        :class="[
          b('item', { 'not-selected': notSelectedState(item) })
            .state({
              error: errorState,
            })
            .toString()
        ]"
        @click="select({ checked: true }, item.value)">
        <Icon
          :name="item.icon"
          :class="b('icon').toString()" />

        <input
          :id="item.id"
          :class="b('button').toString()"
          :name="name"
          :checked="item.value === value"
          type="radio"
          @change="select($event.target, item.value)">

        <label
          :class="b('label', { color: 'white' }).toString()"
          :for="item.id"><span :class="b('label--heading').toString()">{{ item.heading }}</span><br>
          <span v-if="showDisplayText">{{ item.display }}</span></label>

        <label
          :class="b('outside', { color: 'white' }).toString()"
          :for="item.id" />
      </li>
    </ul>
    <div
      v-if="errorState"
      :class="b('error-msg').toString()">
      {{ errorMessage }}
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators';
import tokens from '@/assets/tokens/tokens.json';

/**
 * Render a set of radio buttons that has a `value` of the
 * currently selected button
 */
export default {
  name: 'RadioGroupBox',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'radio-box',
  model: {
    event: 'change',
    prop: 'value',
  },
  props: {
    /**
     * Name of the radio group in the form.
     */
    name: {
      type: String,
      default: 'radiogroupbox',
    },
    /**
     * A list of items to render. Each item must have a 'heading', `display`, and a `value`.
     *
     *
     * `[ { heading: 'Color', display: 'Green', value: 'a' } ]`
     */
    items: {
      type: Array,
      default: () => [],
      validator: items => items.every(item => ('heading' in item) && ('display' in item) && ('value' in item)),
    },
    /**
     * The value of the selected item.
     */
    value: {
      default: null,
    },
    /**
     * The number of columns in each row of buttons.
     */
    columns: {
      type: Number,
      default: 1,
    },
    /**
     * Determine whether or not to show the display text.
     */
    showDisplayText: {
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
    /**
     * Add validations to the field in the form of a Vuelidate object.
     * `{ maxLength: maxLength(20) }`
     */
    validations: {
      type: Object,
      default() { return {}; },
    },
  },
  data() {
    return {
      // validatedValue is used to delay validation until @change. This is
      // because using v-model.lazy on components doesn't currently work.
      validatedValue: '',
    };
  },
  computed: {
    // Add an id property to each item so the label can reference it
    renderItems() {
      return this.items.map(item => (
        {
          ...item,
          id: this.radioId(item),
        }
      ));
    },
    gridStyles() {
      return {
        'grid-template-columns': `repeat(${this.columns}, 1fr)`,
      };
    },
    successState() {
      if (Object.keys(this.validations).length || this.required) {
        return !!(this.validatedValue && !this.errorState);
      }

      // It can only be considered to pass validation if there *are* validations
      return false;
    },
    errorState() {
      return this.$v.validatedValue.$error;
    },
    errorMessage() {
      return this.getErrorMessages(this.$v.validatedValue, this.errorMessages)[0];
    },
  },
  watch: {
    value() {
      // Only validate when the user has left the field
      this.validate();
    },
  },
  created() {
    // Not in data() because we don't want it updating every time v-model does
    this.validatedValue = this.value;

    // If starting with a value, validate it right away
    if (this.value) this.validate();
  },
  methods: {
    radioId(item) {
      return `${tokens.prefix_component}radio-box-${this.name}-item-${item.value}`;
    },
    select({ checked }, value) {
      if (!checked) return;
      /**
       * Change event
       *
       * @event change
       * @type String
       */
      this.$emit('change', value);
    },
    validate() {
      this.validatedValue = this.value;
      this.$v.validatedValue.$touch();

      return !this.errorState;
    },
    // This is for when there is a selection, check if `item` is selected.
    // When there is no selection, return false for all items.
    notSelectedState(item) {
      return (this.value !== null) && (this.value !== item.value);
    },
  },
  validations() {
    const validations = {
      validatedValue: {
        ...this.validations,
      },
    };

    if (this.required) validations.validatedValue.required = required;

    return validations;
  },
};
</script>

<docs>
```vue
<template>
  <div>
    <RadioGroupBox
      v-model="radioGroupBox"
      name="npa-plan-selection"
      :columns="2"
      :items="[
        { heading: 'Heading One', display: 'One Content', icon: 'service-google', value: '1' },
        { heading: 'Heading Two', display: 'Two Content', icon: 'service-google', value: '2' },
      ]"
      :showDisplayText="showDisplayText"
      :errorMessages="{required: 'Please select an option'}"
      required
       />
  </div>
</template>
<script>
export default {
  data() {
    return {
      radioGroupBox: '',
      showDisplayText: false
    }
  }
};
</script>
```
</docs>
