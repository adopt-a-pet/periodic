<template>
  <TextInput
    ref="input"
    :disabled="disabled"
    :name="name"
    :required="required"
    :size="size"
    :type="showPassword ? 'text' : 'password'"
    :label="label"
    :label-right="labelRight"
    :error-messages="errorMessages"
    :show-valid-tick="showValidTick"
    :validations="validations"
    :value="value"
    @input="onInput"
    @change="onChange"
    @blur="onBlur"
    @focus="onFocus">

    <template slot="right">
      <span
        :class="b('eye').is({ active: showPassword }).toString()"
        @click="showPassword = !showPassword;">

        <Icon
          name="eye" />
      </span>
    </template>
  </TextInput>
</template>

<script>
import { minLength } from 'vuelidate/lib/validators';

/**
 *
 */
export default {
  name: 'PasswordInput',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'text-field',
  model: {
    prop: 'value',
    event: 'change',
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
     * The label for the right side of the form input field.
     */
    labelRight: {
      type: String,
      default: null,
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
      default() { return { minLength: minLength(8) }; },
    },
    /**
     * What error message to show for each validation error
     */
    errorMessages: {
      type: Object,
      default: () => ({
        required: 'Enter Password',
        minLength: 'Invalid Password',
      }),
    },
    /**
     * If `successState` is true should it also show the green tick on the right?
     */
    showValidTick: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showPassword: false,
    };
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
    onFocus(value) {
      /**
       * Focus event
       *
       * @event focus
       * @type none
       */
      this.$emit('focus', value);
    },
    onChange(value) {
      /**
       * Change event
       *
       * @event change
       * @type String
       */
      this.$emit('change', value);
    },
    onBlur() {
      /**
       * Blur event
       *
       * @event blur
       * @type none
       */
      this.$emit('blur');
    },
    validate() {
      return this.$refs.input.validate();
    },
  },
};
</script>

<docs>
```vue
<template>
  <div>
    <PasswordInput
      v-model="passwordInput1" />

    <br />

    <PasswordInput
      v-model="passwordInput2"
      label="Required"
      required />

    <br />

    <PasswordInput
      label="Disabled"
      disabled />
  </div>
</template>
<script>
export default {
  data() {
    return {
      passwordInput1: '',
      passwordInput2: '',
    }
  }
};
</script>
```
</docs>
