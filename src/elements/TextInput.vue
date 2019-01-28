<template>
  <div :class="b('container').toString()">
    <input
      ref="input"
      :autocomplete="autocomplete"
      :class="[
        b('input', { [size]: true })
          .state({
            error: errorState,
            success: successState,
          })
          .has({
            label,
            content: hasContent,
            'focus-border': focusBorder
          })
          .toString(),
      ]"
      :disabled="disabled"
      :name="name"
      :readonly="readonly"
      :type="type"
      :value="value"
      @blur="onBlur"
      @change="onChange($event.target.value)"
      @input="onInput($event.target.value)"
      @focus="onFocus"
      @click="onClick">

    <label
      :for="name"
      :class="b('label', { main: true }).is({ smaller: hasContent || focused }).toString()">{{ label }}</label>

    <div
      :class="b('slot', { right: true }).toString()">

      <label
        v-if="showLabelRight"
        :for="name"
        :class="b('label', { right: true }).toString()">{{ labelRight }}</label>

      <slot name="right" />

      <Icon
        v-if="successState && showValidTick"
        :class="b('valid-tick').toString()"
        name="check-green" />
    </div>

    <div
      v-if="errorState"
      :class="b('error-msg').toString()">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

/**
 * An extensible, general text input field
 */
export default {
  name: 'TextInput',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'text-field',
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
      default: '',
    },
    /**
     * The label for the right side of the form input field.
     */
    labelRight: {
      type: String,
      default: null,
    },
    /**
     * Whether the form input field is disabled or not.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Field type (text, email, password, etc.)
     */
    type: {
      type: String,
      default: 'text',
    },
    /**
     * What error message to show for each validation error
     */
    errorMessages: {
      type: Object,
      default: () => ({}),
    },
    /**
     * If `successState` is true should it also show the green tick on the right?
     */
    showValidTick: {
      type: Boolean,
      default: true,
    },
    /**
     * Change border color on focus
     */
    focusBorder: {
      type: Boolean,
      default: true,
    },
    /**
     * Set the field to readonly
     */
    readonly: {
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
    /**
     * Change autocomplete settings
     */
    autocomplete: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      focused: false,

      // validatedValue is used to delay validation until @change. This is
      // because using v-model.lazy on components doesn't currently work.
      // See: https://github.com/vuejs/vue/pull/6940
      validatedValue: '',
    };
  },
  computed: {
    hasContent() {
      return this.value && this.value.length;
    },
    showLabelRight() {
      const showLabelRight = !!this.labelRight;

      return showLabelRight;
    },
    errorState() {
      return this.$v.validatedValue.$error;
    },
    successState() {
      if (Object.keys(this.validations).length || this.required) {
        return !!(this.validatedValue && !this.errorState);
      }

      // It can only be considered to pass validation if there *are* validations
      return false;
    },
    errorMessage() {
      return this.getErrorMessages(this.$v.validatedValue, this.errorMessages)[0];
    },
  },
  created() {
    // Not in data() because we don't want it updating every time v-model does
    this.validatedValue = this.value;
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
      this.$v.validatedValue.$touch();

      /**
       * Blur event
       *
       * @event blur
       * @type none
       */
      this.$emit('blur');
    },
    onClick() {
      /**
       * Click event
       *
       * @event click
       * @type none
       */
      this.$emit('click');
    },
    onFocus() {
      this.focused = true;

      /**
       * Focus event
       *
       * @event focus
       * @type none
       */
      this.$emit('focus');
    },
    onChange(value) {
      this.validatedValue = value;

      /**
       * Change event
       *
       * @event change
       * @type String
       */
      this.$emit('change', value);
    },
    validate() {
      this.$v.validatedValue.$touch();
      return !this.errorState;
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
    <TextInput
      v-model="textInput1" />

    <br />

    <TextInput
      v-model="textInput2"
      label="Label"
      label-right="Label Right" />

    <br />

    <TextInput
      v-model="textInput3"
      label="Disabled"
      disabled />

    <br />

    <TextInput
      v-model="textInput4"
      label="Small"
      size="small" />

    <br />

    <TextInput
      v-model="textInput5"
      label="Customize errors"
      :errorMessages="{ required: 'Hey! Why is this empty?' }"
      required />
  </div>
</template>
<script>
export default {
  data() {
    return {
      textInput1: '',
      textInput2: '',
      textInput3: '',
      textInput4: '',
      textInput5: '',
    }
  }
};
</script>
```
</docs>
