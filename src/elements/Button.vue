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
 * Defaults to primary/large.
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
      default: 'primary',
      validator: value => value.match(/(primary|warning|accent)/),
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
    <Button color="accent">Accent</Button> <br />
    <Button color="accent" size="small">Small Accent</Button> <br />
    <Button color="warning">Warning</Button> <br />
    <Button color="warning" size="small">Small Warning</Button> <br />
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
