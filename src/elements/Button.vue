<template>
  <component
    :is="tag"
    :href="href"
    :type="type"
    :class="[b({ color, size }).toString(), state]"
    :disabled="disabled"
    @click="click">
    <slot />
  </component>
</template>

<script>
/**
 * Buttons are generally used for interface actions. Suitable for all-purpose use.
 * Defaults to green/large.
 */
export default {
  name: 'Button',
  blockName: 'button',
  status: 'under-review',
  release: '1.0.0',
  props: {
    /**
     * The html element used for the button.
     * `button, a`
     */
    tag: {
      type: String,
      default: 'button',
      validator: value => value.match(/(button|a)/),
    },
    /**
     * The size of the button.
     * `small, large`
     */
    size: {
      type: String,
      default: 'large',
      validator: value => value.match(/(small|large)/),
    },
    /**
     * When setting the button’s type to a link, use this option to give a href.
     */
    href: {
      type: String,
      default: null,
    },
    /**
     * Set the type to “button” to prevent button clicks from submiting a form.
     * `button, submit`
     */
    type: {
      type: String,
      default: null,
      validator: value => value.match(/(button|submit)/),
    },
    /**
     * Manually trigger various states of the button.
     * `hover, active, focus`
     */
    state: {
      type: String,
      default: null,
      validator: value => value.match(/(hover|active|focus)/),
    },
    /**
     * Color allows us to easily change the color.
     * `color`
     */
    color: {
      type: String,
      default: 'green',
      validator: value => value.match(/(green|blue|orange)/),
    },
    /**
     * Is the button disabled?
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    click() {
      if (this.disabled) return;
      /**
       * Click event
       *
       * @event click
       * @type none
       */
      this.$emit('click');
    },

    syscallTest() {
      /**
       * Do some STUFF!
       *
       * @syscall api/getBreeds
       */
      this.$syscall('api/getBreeds');
    },
  },
};
</script>

<docs>
```vue
<template>
  <div>
    <Button>Default</Button> <br />
    <Button state="hover">:hover</Button> <br />
    <Button state="active">:active</Button> <br />
    <Button size="small">Small</Button> <br />
    <Button :disabled="true">Disabled</Button> <br />
    <Button :disabled="true" size="small">Small Disabled</Button> <br />
    <Button color="blue">Blue</Button> <br />
    <Button color="blue" size="small">Small Blue</Button> <br />
    <Button color="orange">Orange</Button> <br />
    <Button color="orange" size="small">Small Orange</Button> <br />
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
};
</script>
```
</docs>
