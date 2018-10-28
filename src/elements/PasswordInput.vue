<template>
  <component :is="wrapper" :class="['text-field-container']">
    <input
      :class="[inputClass, state, {
        'is-error': errorState,
        'is-success': successState,
        'not-empty': password
      }]"
      :disabled="disabled"
      :name="name"
      :required="required"
      type="password"
      v-model.lazy.trim="password"
      v-validate="validations"
      @input="onInput($event.target.value)"
      @focus="onFocus($event.target.value)"
    />
    <span v-if="successState" class="valid-tick"></span>
    <label :for="name" :class="labelClass">{{label}}</label>
    <div v-if="errorState" class="form__error-msg">{{errorMessage}}</div>
  </component>
</template>

<script>
import { mixin as veeValidateMixin, directive as veeValidateDirective } from "vee-validate"

/**
 *
 */
export default {
  name: "PasswordInput",
  status: "under-review",
  release: "1.0.0",
  mixins: [veeValidateMixin],
  directives: { validate: veeValidateDirective },
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
      default: "password",
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
      default: "Password",
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
      password: this.value,
    }
  },
  methods: {
    onInput(value) {
      this.$emit("change", value)
    },
    onFocus(value) {
      this.$emit("focus", value)
    },
    setErrorMessages() {
      let messages = {}

      messages[this.name] = {
        min: "Invalid Password",
        required: "Password Required",
      }

      this.$validator.localize("en", {
        custom: messages,
      })
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
      return this.errors.has(this.name)
    },
    errorMessage() {
      return this.errors.first(this.name)
    },
    successState() {
      return this.password && !this.errorState
    },
    validations() {
      const required = this.required && "required"

      return [required, "min:8"].filter(v => !!v).join("|")
    },
  },
  created() {
    this.setErrorMessages()
  },
}
</script>

<docs>
  ```jsx
  <div>
    <PasswordInput />
    <br>
    <PasswordInput label="Required" required />
    <br>
    <PasswordInput label="Disabled" disabled />
    <br>
    <PasswordInput label="Small" size="small" />
  </div>
  ```
</docs>
