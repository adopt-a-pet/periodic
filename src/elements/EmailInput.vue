<template>
  <div class="text-field-container">
    <input
      :class="[inputClass, state, {
        'is-error': errorState,
        'is-success': successState,
        'not-empty': email
      }]"
      :disabled="disabled"
      :name="name"
      :required="required"
      type="email"
      v-model.lazy.trim="$v.email.$model"
      @blur="$v.email.$touch"
      @input="onInput($event.target.value)"
      @focus="onFocus($event.target.value)"
    />
    <span v-if="successState" class="valid-tick"></span>
    <label :for="name" :class="labelClass">{{label}}</label>
    <div v-if="errorState" class="form__error-msg">{{errorMessage}}</div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate"
import { email, required } from "vuelidate/lib/validators"

/**
 *
 */
export default {
  name: "EmailInput",
  componentBaseClass: "form",
  status: "under-review",
  release: "1.0.0",
  mixins: [validationMixin],
  props: {
    /**
     * The size of the field. Defaults to large.
     * `small, large`
     */
    size: {
      type: String,
      default: "large",
      validator: value => {
        return value.match(/(small|large)/)
      },
    },
    /**
     * Name input field in the form.
     */
    name: {
      type: String,
      default: "email",
    },
    /**
     * Text value of the form input field.
     */
    value: {
      type: String,
      default: "",
    },
    /**
     * The label of the form input field.
     */
    label: {
      type: String,
      default: "Email",
    },
    /**
     * The html element name used for the wrapper.
     * `div, section`
     */
    wrapper: {
      type: String,
      default: "div",
      validator: value => {
        return value.match(/(div|section)/)
      },
    },
    /**
     * The width of the form input field.
     * `auto, expand`
     */
    width: {
      type: String,
      default: "expand",
      validator: value => {
        return value.match(/(auto|expand)/)
      },
    },
    /**
     * Whether the form input field is disabled or not.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Manually trigger various states of the input.
     * `hover, active, focus`
     */
    state: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(hover|active|focus)/)
      },
    },
    /**
     * Whether the form field is required or not.
     */
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      email: this.value,
    }
  },
  methods: {
    onInput(value) {
      this.$emit("change", value)
    },
    onFocus(value) {
      this.$emit("focus", value)
    },
  },
  computed: {
    inputClass() {
      const addSize = this.size === "large" ? "" : `-${this.size}`
      return "form__input" + addSize
    },
    labelClass() {
      const addSize = this.size === "large" ? "" : `-${this.size}`
      return "form__label" + addSize
    },
    errorState() {
      return this.$v.email.$error
    },
    successState() {
      return this.email && !this.$v.email.$error
    },
    errorMessage() {
      if (this.$v.email.required === false) {
        return "Enter Email"
      } else {
        return "Invalid Email"
      }
    },
  },
  validations() {
    const validations = { email: { email } }

    if (this.required) validations.email.required = required

    return validations
  },
}
</script>

<docs>
  ```jsx
  <div>
    <EmailInput />
    <br>
    <EmailInput label="Required" required />
    <br>
    <EmailInput label="Disabled" disabled />
    <br>
    <EmailInput label="Small" size="small" />
  </div>
  ```
</docs>
