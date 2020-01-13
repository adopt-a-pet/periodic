<template>
  <component
    :is="tag"
    :class="b(null, {
      color,
      family: fontFamily,
      size: fontSize,
      weight: fontWeight }).toString()"
    :style="{ lineHeight, textAlign }">
    <!-- @slot Paragraph content goes here -->
    <slot />
  </component>
</template>

<script>
import lineHeightMixin from '@/mixins/line-height';

export default {
  name: 'Paragraph',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'paragraph',
  mixins: [lineHeightMixin],
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    /**
     * What tag to use for the text.
     */
    tag: {
      type: String,
      default: 'p',
    },
    /**
     * Color allows us to easily change the color.
     */
    color: {
      type: String,
      default: null,
      validator: value => value.match(/(gray)/),
    },
    /**
     * The font weight for the text. `light, normal, bold`
     */
    fontWeight: {
      type: String,
      default: 'light',
      validator: value => value.match(/(light|normal|bold)/),
    },
    /**
     * The font family for the text. `special`
     */
    fontFamily: {
      type: String,
      default: null,
      validator: value => value.match(/(special)/),
    },
    /**
     * The font size for the text. `xxxs, xxs, xs, s, m, l, xl, xxl`
     */
    fontSize: {
      type: String,
      default: 'm',
      validator: value => value.match(/(xxxs|xxs|xs|s|m|l|xl|xxl)/),
    },
    /**
     * The line height for the text.
     */
    lineHeight: {
      type: String,
      default: null,
    },
    /**
     * The alignment for the text. Default is null so it inherits.
     */
    textAlign: {
      type: String,
      default: null,
    },
  },
};
</script>

<docs>
  ```jsx
  <div>
    <Paragraph
      v-bind:style="{ 'font-size': $tokens.font_size_xxl }">
      Principles are the foundation of the system. They form the basis of a good
      product and help the team with decision making. They are here to guide you
      and your team when working with the myriad parts of the system and help
      you do better and more informed decisions.
    </Paragraph>

    <br>

    <Paragraph
      font-size="l"
      font-family="special"
      font-weight="normal">
      Principles are the foundation of the system. They form the basis of a good
      product and help the team with decision making. They are here to guide you
      and your team when working with the myriad parts of the system and help
      you do better and more informed decisions.
    </Paragraph>

    <br>

    <Paragraph
      font-size="xs"
      font-family="special"
      font-weight="bold"
      line-height="2">
      Principles are the foundation of the system. They form the basis of a good
      product and help the team with decision making. They are here to guide you
      and your team when working with the myriad parts of the system and help
      you do better and more informed decisions.
    </Paragraph>
  </div>
  ```
</docs>
