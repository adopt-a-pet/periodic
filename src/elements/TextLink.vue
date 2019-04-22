<template>
  <component
    :is="tag"
    :href="href"
    :class="b({ color, underline: alwaysUnderline }).toString()"
    @click="click">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'TextLink',
  blockName: 'textlink',
  status: 'under-review',
  release: '1.0.0',
  props: {
    /**
     * This option changes the link’s tag to `a`.
     */
    href: {
      type: String,
      default: null,
    },
    /**
     * Color allows us to easily change the color.
     * `color`
     */
    color: {
      type: String,
      default: 'blue',
      validator: value => value.match(/(blue|gray-light)/),
    },
    /**
     * Always show the underline.
     */
    alwaysUnderline: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    tag() {
      return this.href ? 'a' : 'span';
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
    <TextLink href="/">Default</TextLink>
    <br />
    <br />
    <TextLink>Without an href, the tag is a span</TextLink>
    <br />
    <br />
    <TextLink color="gray-light">Without an href, the tag is a span</TextLink>
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
