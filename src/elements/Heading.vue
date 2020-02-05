<template>
  <component
    :is="level"
    :class="b(level, [ fontFamily, fontWeight, lineHeightToken, fontSize ]).toString()"
    :style="{ lineHeight: lineHeightNonToken, textAlign }">
    <!-- @slot All content goes here like a normal heading tag -->
    <slot />
  </component>
</template>

<script>
import lineHeightMixin from '@/mixins/line-height';

/**
* Headings are used as the titles of each major section of a page in the
* interface. Use `level` to change the size.
*/
export default {
  name: 'Heading',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'heading',
  mixins: [lineHeightMixin],
  props: {
    /**
    * The level of the heading: h1, h2, h3, h4, h5, h6.
    */
    level: {
      type: String,
      default: null,
      required: true,
      validator: value => value.match(/(h1|h2|h3|h4|h5|h6)/),
    },
    /**
    * The font weight for the heading.
    */
    fontWeight: {
      type: String,
      default: null,
      validator: value => value.match(/(light|bold)/),
    },
    /**
    * The font family for the heading.
    */
    fontFamily: {
      type: String,
      default: null,
      validator: value => value.match(/(special)/),
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
    /**
    * The font size for the text.
    */
    fontSize: {
      type: String,
      default: null,
    },
  },
};
</script>

<docs>
  ```jsx
  <div>
    <Heading level="h1">H1 - Sphinx of black quartz</Heading>
    <Heading
    level="h1"
    font-size="large">H1 Large - Sphinx of black quartz</Heading>
    <Heading
    level="h1"
    font-family="special">H1 Special - Sphinx of black quartz</Heading>
    <Heading level="h2">H2 - Sphinx of black quartz</Heading>
    <Heading level="h3">H3 - Lorem ipsum dolor sit amet, consectetur adipiscing
      elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Heading>
    <Heading
      level="h3"
      line-height="compact">H3 Compact - Lorem ipsum dolor sit amet, consectetur
      adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua</Heading>
    <Heading
      level="h4"
      line-height="">H4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.</Heading>

    <Heading
    level="h4"
      line-height="compact">H4 Compact - Lorem ipsum dolor sit amet, consectetur
      adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      nisi ut aliquip ex ea commodo consequat.</Heading>
    <Heading
      level="h4"
      line-height="x-compact">H4 Extra Compact - Lorem ipsum dolor sit amet, consectetur
      adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat.</Heading>
    <Heading
      font-weight="light"
      level="h4"
      line-height="">H4 Light - Lorem ipsum dolor sit amet, consectetur adipiscing
      elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat.</Heading>
    <Heading
      font-weight="light"
      level="h4"
      line-height="compact">H4 Light Compact - Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat.</Heading>
    <Heading
      font-weight="light"
      level="h4"
      line-height="x-compact">H4 Light Extra Compact - Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat.</Heading>
    <Heading
      level="h5"
      line-height="">h5 - Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
      ea commodo consequat.</Heading>
    <Heading
      level="h5"
      line-height="compact">H5 Compact - Lorem ipsum dolor sit amet, consectetur
      adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      nisi ut aliquip ex ea commodo consequat.</Heading>
    <Heading
      font-weight="light"
      level="h5"
      line-height="">H5 Light - Lorem ipsum dolor sit amet, consectetur adipiscing
      elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat.</Heading>
    <Heading
      font-weight="light"
      level="h5"
      line-height="compact">H5 Light Compact - Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat.</Heading>
    <Heading
      level="h6"
      line-height="">H6 - Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
      ex ea commodo consequat.</Heading>
    <Heading
      level="h6"
      line-height="compact">H6 Compact - Lorem ipsum dolor sit amet, consectetur
      adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      nisi ut aliquip ex ea commodo consequat.</Heading>
    <Heading
      font-weight="light"
      level="h6"
      line-height="">H6 Light - Lorem ipsum dolor sit amet, consectetur adipiscing
      elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat.</Heading>
    <Heading
      font-weight="light"
      level="h6"
      line-height="compact">H6 Light Compact - Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat.</Heading>
  </div>
  ```
</docs>
