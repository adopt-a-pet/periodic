<template>
  <div :class="b('text-field-container').toString()">
    <input
      ref="input"
      :class="[
        inputClass,
        b
          .state({
            error: errorState,
            success: successState,
          })
          .has({
            content: hasContent,
            'focus-border': focusBorder
          })
          .toString(),
      ]"
      :disabled="disabled"
      :name="name"
      :readonly="readonly"
      :required="required"
      :type="type"
      :value="value"
      @blur="onBlur"
      @change="onChange($event.target.value)"
      @input="onInput($event.target.value)"
      @focus="onFocus"
      @click="onClick">

    <span
      v-if="successState && showValidTick"
      class="valid-tick" />
    <label
      :for="name"
      :class="labelClass">{{ label }}</label>
    <slot name="right" />
    <div
      v-if="errorState"
      :class="b('error-msg').toString()">{{ errorMessage }}</div>
  </div>
</template>

<script>
/**
 *
 */
export default {
  name: 'TextInput',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'form',
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
      default: 'Text',
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
     * Field type (text, email, password, etc.)
     */
    type: {
      type: String,
      default: 'text',
    },
    /**
     * Does the field have validation errors? This is mainly used when extended
     * by other components.
     */
    errorState: {
      type: Boolean,
      default: false,
    },
    /**
     * Did the field pass validation? This is mainly used when extended by other
     * components.
     */
    successState: {
      type: Boolean,
      default: false,
    },
    /**
     * If `errorState` is true what error message to show
     */
    errorMessage: {
      type: String,
      default: 'Invalid Input',
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
    hasContent() {
      return this.value && this.value.length;
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
      /**
       * Focus event
       *
       * @event focus
       * @type none
       */
      this.$emit('focus');
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
      label="Required"
      required />

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
      label="Error State"
      :error-state="true" />
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
