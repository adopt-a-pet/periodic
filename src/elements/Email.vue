<template>
  <component :is="wrapper" :class="['text-field-container']">
    <input
      v-model.lazy.trim="$v.email.$model"
      :class="['form__input', state, {
        'is-error': error,
        'is-success': success,
        'not-empty': email
      }]"
      :disabled="disabled"
      :name="name"
      :required="required"
      @input="onInput($event.target.value)"
      @focus="onFocus($event.target.value)"
    />
    <span v-if="success" class="valid-tick"></span>
    <label :for="name" :class="'form__label'">{{label}}</label>
    <div v-if="error && !$v.email.required" :class="'form__error-msg'">Enter Email</div>
    <div v-else-if="error" :class="'form__error-msg'">Invalid Email</div>
  </component>
</template>

<script>
import { validationMixin } from "vuelidate"
import { email } from "vuelidate/lib/validators"
import { required } from "@/validators/input"
import bemNames from "@/mixins/bem-names"

/**
 *
 */
export default {
  name: "Email",
  componentBaseClass: "form",
  status: "under-review",
  release: "1.0.0",
  mixins: [bemNames, validationMixin],
  props: {
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
    error() {
      return this.$v.email.$dirty && this.$v.email.$error
    },
    success() {
      return this.email && !this.$v.email.$error
    },
  },
  validations: {
    email: {
      email,
      required,
    },
  },
}
</script>

<docs>
  ```jsx
  <div>
    <Email />
    <br>
    <Email label="Required" required />
    <br>
    <Email label="Disabled" disabled />
  </div>
  ```
</docs>
