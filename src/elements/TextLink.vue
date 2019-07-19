<template>
  <component
    :is="tag"
    :href="href"
    :target="target"
    :class="b.textInherit({ color, underline: alwaysUnderline }).toString()"
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

    /**
     * Just the normal target prop you find on `a` tags.
     */
    target: {
      type: String,
      default: null,
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
  <Paragraph
    font-size="s"
    font-weight="normal">
    <TextLink href="/">Default</TextLink>
    <br />
    <br />
    <TextLink>Without an href, the tag is a span</TextLink>
    <br />
    <br />
    <TextLink color="gray-light">Without href, gray-light</TextLink>
    <br />
    <br />
    <TextLink color="gray-light" always-underline>Always underline</TextLink>
  </Paragraph>
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
