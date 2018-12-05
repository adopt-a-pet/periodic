<template>
  <div
    :class="b().toString()"
    @click="onChange(!checked)">

    <span
      :class="b('box', { size }).is({ checked }).toString()">

      <Icon
        v-if="checked"
        :class="b('check').toString()"
        name="check" />
    </span>

    <label
      :class="b('label', { size }).toString()">
      <!-- @slot Any label text you want here -->
      <slot />
    </label>
  </div>
</template>

<script>
import tokens from '@/assets/tokens/tokens.json';

/**
 *
 */
export default {
  name: 'Checkbox',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'checkbox',
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    /**
     * The size of the field.
     *
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
     * Should the box start checked.
     */
    checked: {
      type: Boolean,
      default: false,
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
  },
  computed: {
    checkboxId() {
      return `${tokens.prefix_component.value}checkbox-${this.name}`;
    },
  },
  methods: {
    onChange(value) {
      /**
       * Change event
       *
       * @event change
       * @type Boolean
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
    <Checkbox v-model="checkbox1">Normal</Checkbox>
    <br />
    <Checkbox v-model="checkbox2">Starts checked</Checkbox>
    <br />
    <Checkbox size="small" v-model="checkbox1">Small, same v-model as the first</Checkbox>
    <br />
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkbox1: false,
      checkbox2: true,
    }
  }
};
</script>
```
</docs>
