<template>
  <div :class="b('text-field-container').toString()">
    <input
      v-validate="validations"
      :class="[
        inputClass,
        state,
        b
          .state({
            error: errorState,
            success: successState,
          })
          .has({ content: password })
          .toString(),
      ]"
      :disabled="disabled"
      :name="name"
      :required="required"
      :type="showPassword ? 'text' : 'password'"
      v-model.lazy="password"
      @input="onInput($event.target.value);"
      @focus="onFocus($event.target.value);">
    <!-- <span v-if="successState" class="valid-tick"></span> -->
    <label
      :for="name"
      :class="labelClass">{{ label }}</label>
    <span
      :class="{ 'eye-icon__active': showPassword }"
      class="eye-icon"
      @click="showPassword = !showPassword;" />
    <div
      v-if="errorState"
      class="form__error-msg">{{ errorMessage }}</div>
  </div>
</template>

<script>
import bemNames from '@/mixins/bem-names';
import validatedInput from '@/mixins/validated-input';

/**
 *
 */
export default {
  name: 'PasswordInput',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'form',
  mixins: [bemNames, validatedInput],
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
      default: 'password',
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
     * The width of the form input field.
     * `auto, expand`
     */
    width: {
      type: String,
      default: 'expand',
      validator: value => value.match(/(auto|expand)/),
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
      validator: value => value.match(/(hover|active|focus)/),
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
    validations() {
      const required = this.required && 'required';

      return [required, 'min:8'].filter(v => !!v).join('|');
    },
    successState() {
      return this.password && !this.errorState;
    },
  },
  errorMessages: {
    min: 'Invalid Password',
    required: 'Password Required',
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
