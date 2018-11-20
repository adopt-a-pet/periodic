<template>
  <div :class="b('text-field-container').toString()">
    <input
      :class="[
        inputClass,
        state,
        b
          .state({
            error: errorState,
            success: successState,
          })
          .has({ content: hasContent })
          .toString(),
      ]"
      :disabled="disabled"
      :name="name"
      :required="required"
      :type="type"
      :value="value"
      @blur="$emit('blur')"
      @change="$emit('change', value)"
      @input="onInput($event.target.value)"
      @focus="$emit('focus')">

    <span
      v-if="successState"
      class="valid-tick" />
    <label
      :for="name"
      :class="labelClass">{{ label }}</label>
    <div
      v-if="errorState"
      class="form__error-msg">{{ errorMessage }}</div>
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
     * The html element name used for the wrapper.
     * `div, section`
     */
    wrapper: {
      type: String,
      default: 'div',
      validator: value => value.match(/(div|section)/),
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
    /**
     * Field type (text, email, password, etc.)
     */
    type: {
      type: String,
      default: 'text',
    },
    errorState: {
      type: Boolean,
      default: false,
    },
    successState: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: 'Invalid Input',
    },
  },
  data() {
    return {
      hasContent: false,
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
  },
  methods: {
    onInput(value) {
      this.hasContent = value.length;
      this.$emit('input', value);
    },
  },
};
</script>

<docs>
  ```jsx
  <div>
    <TextInput />
    <br />
    <TextInput label="Required" required />
    <br />
    <TextInput label="Disabled" disabled />
    <br />
    <TextInput label="Small" size="small" />
  </div>
  ```
</docs>
