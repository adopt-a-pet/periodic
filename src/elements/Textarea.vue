<template>
  <div :class="b('container').toString()">
    <textarea
      :name="name"
      :maxlength="max"
      :required="required"
      :class="b().is({ 'error': errorState }).has({ content: hasContent }).toString()"
      v-model="inputContent"
      @focus="focused = true"
      @blur="onBlur" />

    <label :class="b('label').toString()">
      <span v-if="hasContent || focused">{{ shortLabel }}</span>
      <span v-if="!(hasContent || focused)">{{ placeholder }}</span>
    </label>

    <div
      v-if="max"
      :class="b('text-limit').toString()">{{ remaining }} Characters Remaining</div>
    <span
      v-if="errorState"
      :class="b('error-msg').toString()">{{ errorMessage }}</span>
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
     * The small label at the top when field is focused
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
      inputContent: this.value,
      focused: false,
    };
  },
  computed: {
    remaining() {
      return this.max - this.inputContent.length;
    },
    hasContent() {
      return this.inputContent.length;
    },
    errorState() {
      return this.$v.inputContent.$error;
    },
    errorMessage() {
      return this.getErrorMessages(this.$v.inputContent, this.errorMessages)[0];
    },
  },
  methods: {
    onInput(value) {
      this.$emit('input', value);
    },
    onBlur() {
      this.focused = false;
      this.$v.inputContent.$touch();
    },
  },
  validations() {
    const validations = {
      inputContent: {},
    };

    if (this.required) validations.inputContent.required = required;
    if (this.min) validations.inputContent.min = minLength(this.min);

    return validations;
  },
};
</script>

<docs>
  ```jsx
  <div>
    <Textarea />
    <br />
    <Textarea placeholder="This can be a very long message" shortLabel="This is shortened" :max="30" />
    <br />
    <Textarea
      :min="10"
      :errorMessages="{
        required: 'Come on! Put something here!',
        min: 'Needs to be longer than 10 characters'
      }"
      placeholder="This textarea is required and must be have more than 10 characters"
      shortLabel="Required and at least 10 characters"
      required />
    <br />
    <Textarea label="Disabled" disabled />
    <br />
    <Textarea label="Small" size="small" />
  </div>
  ```
</docs>
