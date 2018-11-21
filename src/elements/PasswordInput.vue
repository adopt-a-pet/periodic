<template>
  <TextInput
    :disabled="disabled"
    :name="name"
    :required="required"
    :size="size"
    :type="showPassword ? 'text' : 'password'"
    :label="label"
    :wrapper="wrapper"
    :error-state="errorState"
    :error-message="errorMessage"
    :show-valid-tick="false"
    :success-state="successState"
    v-model="inputContent"
    @change="onChange"
    @blur="$v.password.$touch"
    @input="onInput"
    @focus="onFocus">

    <template slot="right">
      <span
        :class="{ 'eye-icon__active': showPassword }"
        class="eye-icon"
        @click="showPassword = !showPassword;" />
    </template>
  </TextInput>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { minLength, required } from 'vuelidate/lib/validators';

/**
 *
 */
export default {
  name: 'PasswordInput',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'form',
  mixins: [validationMixin],
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
      default: 'Password',
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
      password: this.value,
      showPassword: false,
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
      return this.$v.password.$error;
    },
    successState() {
      return !!(this.password && !this.errorState);
    },
    errorMessage() {
      if (this.$v.password.required === false) {
        return 'Enter Password';
      }

      return 'Invalid Password';
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
      this.$v.password.$model = value;
      this.$emit('change', value);
    },
  },
  validations() {
    const validations = {
      password: {
        minLength: minLength(8),
        ...this.validations,
      },
    };

    if (this.required) validations.password.required = required;

    return validations;
  },
};
</script>

<docs>
  ```jsx
  <div>
    <PasswordInput />
    <br />
    <PasswordInput label="Required" required />
    <br />
    <PasswordInput label="Disabled" disabled />
  </div>
  ```
</docs>
