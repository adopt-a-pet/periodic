<template>
  <component
    :is="level"
    :class="b(level, [ fontFamily, fontWeight, lineHeight ]).toString()">

    <!-- @slot All content goes here like a normal heading tag -->
    <slot />
  </component>
</template>

<script>
/**
 * Headings are used as the titles of each major section of a page in the
 * interface. Use `level` to change the size.
 */
export default {
  name: 'Heading',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'heading',
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
      validator: value => value.match(/(museo)/),
    },
    /**
     * The line height for the heading.
     */
    lineHeight: {
      type: String,
      default: null,
      validator: value => value.match(/(compact|x-compact)/),
    },
  },
};
</script>

<docs>
  ```jsx
  <div>
    <Heading level='h1'>H1 - The quick brown fox.</Heading>
    <Heading
      level='h1'
      font-family='museo'>H1 - The quick brown fox.</Heading>
    <Heading
      level='h2'
      font-weight='bold'>H2 - The quick brown fox.</Heading>
    <Heading level='h2'>H2 - The quick brown fox.</Heading>
    <Heading
      level='h2'
      font-weight='light'>H2 - The quick brown fox.</Heading>
    <Heading
      level='h2'
      font-family='museo'>H2 - The quick brown fox.</Heading>
    <Heading
      level='h3'
      font-weight='bold'>H3 - The quick brown fox.</Heading>
    <Heading
      level='h3'
      font-weight='bold'
      line-height='compact'>H3 - The quick brown fox.</Heading>
    <Heading level='h3'>H3 - The quick brown fox.</Heading>
    <Heading
      level='h3'
      line-height='compact'>H3 - The quick brown fox.</Heading>
    <Heading
      level='h3'
      font-weight='light'>H3 - The quick brown fox.</Heading>
    <Heading
      level='h3'
      font-weight='light'
      line-height='compact'>H3 - The quick brown fox.</Heading>
    <Heading
      level='h3'
      font-family='museo'>H3 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      font-weight='bold'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      font-weight='bold'
      line-height='compact'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      font-weight='bold'
      line-height='x-compact'>H4 - The quick brown fox.</Heading>
    <Heading level='h4'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      line-height='compact'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      line-height='x-compact'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      font-weight='light'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      font-weight='light'
      line-height='compact'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      font-weight='light'
      line-height='x-compact'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      font-family='museo'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      font-family='museo'
      line-height='compact'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      font-family='museo'
      line-height='x-compact'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h5'
      font-weight='bold'>H5 - The quick brown fox.</Heading>
    <Heading
      level='h5'
      font-weight='bold'
      line-height='compact'>H5 - The quick brown fox.</Heading>
    <Heading level='h5'>H5 - The quick brown fox.</Heading>
    <Heading
      level='h5'
      line-height='compact'>H5 - The quick brown fox.</Heading>
    <Heading
      level='h5'
      font-weight='light'>H5 - The quick brown fox.</Heading>
    <Heading
      level='h5'
      font-weight='light'
      line-height='compact'>H5 - The quick brown fox.</Heading>
    <Heading
      level='h5'
      font-family='museo'>H5 - The quick brown fox.</Heading>
    <Heading
      level='h5'
      font-family='museo'
      line-height='compact'>H5 - The quick brown fox.</Heading>
    <Heading
      level='h6'
      font-weight='bold'>H6 - The quick brown fox.</Heading>
    <Heading
      level='h6'
      font-weight='bold'
      line-height='compact'>H6 - The quick brown fox.</Heading>
    <Heading level='h6'>H6 - The quick brown fox.</Heading>
    <Heading
      level='h6'
      line-height='compact'>H6 - The quick brown fox.</Heading>
    <Heading
      level='h6'
      font-weight='light'>H6 - The quick brown fox.</Heading>
    <Heading
      level='h6'
      font-weight='light'
      line-height='compact'>H6 - The quick brown fox.</Heading>
    <Heading
      level='h6'
      font-family='museo'>H6 - The quick brown fox.</Heading>
    <Heading
      level='h6'
      font-family='museo'
      line-height='compact'>H6 - The quick brown fox.</Heading>
  </div>
  ```
</docs>
