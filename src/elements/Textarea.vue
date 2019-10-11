<template>
  <div :class="b('container').toString()">
    <textarea
      :name="name"
      :maxlength="max"
      :required="required"
      :class="b().is({ 'error': errorState }).has({ content: hasContent }).toString()"
      :disabled="disabled"
      @input="onInput($event.target.value)"
      @focus="focused = true"
      @blur="onBlur"
      @scroll.passive="onScroll" />

    <label
      :class="b('label').is({ hidden: hideLabels }).toString()">

      <span v-if="hasContent || focused">{{ shortLabel || placeholder }}</span>
      <span v-if="!(hasContent || focused)">{{ placeholder }}</span>
    </label>

    <span
      v-if="errorState"
      :class="b('error-msg').is({ hidden: hideLabels }).toString()">{{ errorMessage }}</span>

    <div
      v-if="max"
      :class="b('text-limit').toString()">
      {{ remaining }} Characters Remaining
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';

/**
 *
 */
export default {
  name: 'Textarea',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'textarea',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    /**
     * Name input field in the form
     */
    name: {
      type: String,
      default: 'text',
    },
    /**
     * Text value of the field
     */
    value: {
      type: String,
      default: '',
    },
    /**
     * The placeholder text for the field
     */
    placeholder: {
      type: String,
      default: null,
    },
    /**
     * The small label at the top when field is focused. Falls back to
     * placeholder if not defined.
     */
    shortLabel: {
      type: String,
      default: null,
    },
    /**
     * Whether the field is disabled or not
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether the field is required or not
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * Minimum number of characters required
     */
    min: {
      type: Number,
      default: 0,
    },
    /**
     * Maximum number of characters allowed
     */
    max: {
      type: Number,
      default: null,
    },
    /**
     * What error message to show
     */
    errorMessages: {
      type: Object,
      default: () => ({
        required: 'This is required',
      }),
    },
  },
  data() {
    return {
      focused: false,
      scrollAmt: 0,
    };
  },
  computed: {
    remaining() {
      return this.max - this.value.length;
    },
    hasContent() {
      return this.value.length;
    },
    errorState() {
      return this.$v.value.$error;
    },
    errorMessage() {
      return this.getErrorMessages(this.$v.value, this.errorMessages)[0];
    },
    hideLabels() {
      return this.scrollAmt > 0;
    },
  },
  methods: {
    onInput(value) {
      /**
       * Input event
       *
       * @event input
       * @type String
       */
      this.$emit('input', value);
    },
    onBlur() {
      this.focused = false;
      this.$v.value.$touch();
      /**
       * Blur event
       *
       * @event blur
       * @type none
       */
      this.$emit('blur');
    },
    validate() {
      this.$v.value.$touch();
      return !this.errorState;
    },
    onScroll({ target: { scrollTop } }) {
      this.scrollAmt = scrollTop;
    },
  },
  validations() {
    const validations = {
      value: {},
    };

    if (this.required) validations.value.required = required;
    if (this.min) validations.value.min = minLength(this.min);

    return validations;
  },
};
</script>

<docs>
```vue
<template>
  <div>
    <Textarea
      v-model="textArea1"
      placeholder="Characters remaining will show at the bottom if `max` is passed"
      shortLabel="This is shortened"
      :max="30" />

    <br />

    <Textarea
      v-model="textArea2"
      :min="10"
      :errorMessages="{
        required: 'Come on! Put something here!',
        min: 'Needs to be longer than 10 characters'
      }"
      placeholder="This textarea is required and must have more than 10 characters"
      shortLabel="Required and at least 10 characters"
      required />

    <br/>

    <Textarea
      v-model="textArea3"
      placeholder="Disabled"
      disabled />
  </div>
</template>
<script>
export default {
  data() {
    return {
      textArea1: '',
      textArea2: '',
      textArea3: '',
    }
  }
};
</script>
```
</docs>
