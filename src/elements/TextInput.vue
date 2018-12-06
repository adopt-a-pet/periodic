<template>
  <div :class="b('container').toString()">
    <input
      ref="input"
      :class="[
        inputClass,
        b('input', { [size]: true })
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
      :type="type"
      :value="value"
      @blur="onBlur"
      @change="onChange($event.target.value)"
      @input="onInput($event.target.value)"
      @focus="onFocus"
      @click="onClick">

    <Icon
      v-if="successState && showValidTick"
      :class="b('valid-tick').toString()"
      name="check-green" />

    <label
      :for="name"
      :class="b('label', { main: true }).is({ smaller: hasContent || focused }).toString()">{{ label }}</label>

    <label
      v-if="showLabelRight"
      :for="name"
      :class="b('label', { right: true }).toString()">{{ labelRight }}</label>

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
      default: 'Text',
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
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    labelClass() {
      const addSize = this.size === 'large' ? '' : `-${this.size}`;
      return this.b('label') + addSize;
    },
    hasContent() {
      return this.value && this.value.length;
    },
    showLabelRight() {
      let showLabelRight = !!this.labelRight;

      if (this.hasContent || this.errorState) {
        showLabelRight = false;
      }

      return showLabelRight;
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
      this.focused = false;

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
