<template>
  <TextInput
    :disabled="disabled"
    :name="name"
    :required="required"
    :size="size"
    :label="label"
    :wrapper="wrapper"
    :error-state="errorState"
    :error-message="errorMessage"
    :success-state="successState"
    v-model="inputContent"
    type="email"
    @change="onChange"
    @blur="$v.email.$touch"
    @input="onInput"
    @focus="onFocus" />
</template>

<script>
import { validationMixin } from 'vuelidate';
import { email, required } from 'vuelidate/lib/validators';

/**
 *
 */
export default ({
  name: 'EmailInput',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'form',
  mixins: [validationMixin],
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    /**
     * The size of the field. Defaults to large.
     * `small, large`
     */
    size: {
      type: String,
      default: 'large',
      validator: value => value.match(/(small|large)/),
    },
    /**
     * Name input field in the form.
     */
    name: {
      type: String,
      default: 'text',
    },
    /**
     * Text value of the form input field.
     */
    value: {
      type: String,
      default: '',
    },
    /**
     * The label of the form input field.
     */
    label: {
      type: String,
      default: 'Email',
    },
    /**
     * The html element name used for the wrapper.
     * `div, section`
     */
    wrapper: {
      type: String,
      default: 'div',
      validator: value => value.match(/(div|section)/),
    },
    /**
     * Whether the form input field is disabled or not.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether the form field is required or not.
     */
    required: {
      type: Boolean,
      default: false,
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
      inputContent: this.value,
      email: this.value,
    };
  },
  computed: {
    inputClass() {
      const addSize = this.size === 'large' ? '' : `-${this.size}`;
      return this.b('input') + addSize;
    },
    labelClass() {
      const addSize = this.size === 'large' ? '' : `-${this.size}`;
      return this.b('label') + addSize;
    },
    errorState() {
      return this.$v.email.$error;
    },
    successState() {
      return !!(this.email && !this.errorState);
    },
    errorMessage() {
      if (this.$v.email.required === false) {
        return 'Enter Email';
      }

      return 'Invalid Email';
    },
  },
  methods: {
    onInput(value) {
      this.$emit('input', value);
    },
    onFocus(value) {
      this.$emit('focus', value);
    },
    onChange(value) {
      this.$v.email.$model = value;
      this.$emit('change', value);
    },
  },
  validations() {
    const validations = {
      email: {
        email,
        ...this.validations,
      },
    };

    if (this.required) validations.email.required = required;

    return validations;
  },
});
</script>

<docs>
  ```jsx
  <div>
    <EmailInput />
    <br />
    <EmailInput label="Required" required />
    <br />
    <EmailInput label="Disabled" disabled />
    <br />
    <EmailInput label="Small" size="small" />
  </div>
  ```
</docs>
