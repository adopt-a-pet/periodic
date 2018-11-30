<template>
  <div :class="b('container').toString()">
    <textarea
      :name="name"
      :maxlength="max"
      :required="required"
      :class="b().is({ 'error': false }).has({ content: hasContent }).toString()"
      v-model="inputContent"
      aria-required="true"
      aria-invalid="false"
      @focus="focused = true"
      @blur="focused = false" />

    <label :class="b('label').toString()">
      <span v-if="hasContent || focused">{{ shortLabel }}</span>
      <span v-if="!(hasContent || focused)">{{ placeholder }}</span>
    </label>

    <div
      v-if="max"
      :class="b('text-limit').toString()">{{ remaining }} Characters Remaining</div>
    <div
      v-if="max"
      :class="b('error-msg').is({ 'error': false }).mix('form__error-msg').toString()">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

/**
 *
 */
export default {
  name: 'Textarea',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'textarea',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    /**
     * Name input field in the form.
     */
    name: {
      type: String,
      default: 'text',
    },
    /**
     * Text value of the field.
     */
    value: {
      type: String,
      default: '',
    },
    /**
     * The placeholder text for the field.
     */
    placeholder: {
      type: String,
      default: null,
    },
    /**
     * The small label at the top when field is focused.
     */
    shortLabel: {
      type: String,
      default: null,
    },
    /**
     * Whether the field is disabled or not.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether the field is required or not.
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * Maximum number of characters allowed
     */
    max: {
      type: Number,
      default: null,
    },
    /**
     * What error message to show
     */
    errorMessage: {
      type: String,
      default: 'Invalid',
    },
  },
  data() {
    return {
      inputContent: this.value,
      focused: false,
    };
  },
  computed: {
    remaining() {
      return this.max - this.inputContent.length;
    },
    hasContent() {
      return this.inputContent.length;
    },
    errorState() {
      return this.$v.inputContent.$error;
    },
  },
  methods: {
    onInput(value) {
      this.$emit('input', value);
    },
  },
  validations() {
    const validations = {
      inputContent: {},
    };

    if (this.required) validations.inputContent.required = required;

    return validations;
  },
};
</script>

<docs>
  ```jsx
  <div>
    <Textarea />
    <br />
    <Textarea placeholder="This can be a very long message" shortLabel="This is shortened" :max="30" />
    <br />
    <Textarea label="Required" required />
    <br />
    <Textarea label="Disabled" disabled />
    <br />
    <Textarea label="Small" size="small" />
  </div>
  ```
</docs>
