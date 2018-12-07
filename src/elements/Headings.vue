<template>
  <component
    :is="level"
    :class="[b(level).toString(), fontSize, fontFamily, fontWeight, lineHeight]"><slot />
  </component>
</template>

<script>
/**
 * Example component is used to visually communicate core parts of the product
 * and available actions.
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
      default: '',
      required: true,
      validator: value => value.match(/(h1|h2|h3|h4|h5|h6)/),
    },
    /**
     * The font size for the heading.
     */
    fontSize: {
      type: String,
      default: '',
    },
    /**
     * The font weight for the heading.
     */
    fontWeight: {
      type: String,
      default: '',
    },
    /**
     * The font family for the heading.
     */
    fontFamily: {
      type: String,
      default: '',
    },
    /**
     * The line height for the heading.
     */
    lineHeight: {
      type: String,
      default: '',
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
      fontFamily='periodic-heading__h1--museo'>H1 - The quick brown fox.</Heading>
    <Heading
      level='h2'
      fontWeight='periodic-heading__h2--bold'>H2 - The quick brown fox.</Heading>
    <Heading level='h2'>H2 - The quick brown fox.</Heading>
    <Heading
      level='h2'
      fontWeight='periodic-heading__h2--light'>H2 - The quick brown fox.</Heading>
    <Heading
      level='h2'
      fontFamily='periodic-heading__h2--museo'>H2 - The quick brown fox.</Heading>
    <Heading
      level='h3'
      fontWeight='periodic-heading__h3--bold'>H3 - The quick brown fox.</Heading>
    <Heading
      level='h3'
      fontWeight='periodic-heading__h3--bold'
      lineHeight='periodic-heading__h3--compact'>H3 - The quick brown fox.</Heading>
    <Heading level='h3'>H3 - The quick brown fox.</Heading>
    <Heading
      level='h3'
      lineHeight='periodic-heading__h3--compact'>H3 - The quick brown fox.</Heading>
    <Heading
      level='h3'
      fontWeight='periodic-heading__h3--light'>H3 - The quick brown fox.</Heading>
    <Heading
      level='h3'
      fontWeight='periodic-heading__h3--light'
      lineHeight='periodic-heading__h3--compact'>H3 - The quick brown fox.</Heading>
    <Heading
      level='h3'
      fontFamily='periodic-heading__h3--museo'>H3 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      fontWeight='periodic-heading__h4--bold'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      fontWeight='periodic-heading__h4--bold'
      lineHeight='periodic-heading__h4--compact'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      fontWeight='periodic-heading__h4--bold'
      lineHeight='periodic-heading__h4--x-compact'>H4 - The quick brown fox.</Heading>
    <Heading level='h4'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      lineHeight='periodic-heading__h4--compact'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      lineHeight='periodic-heading__h4--x-compact'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      fontWeight='periodic-heading__h4--light'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      fontWeight='periodic-heading__h4--light'
      lineHeight='periodic-heading__h4--compact'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      fontWeight='periodic-heading__h4--light'
      lineHeight='periodic-heading__h4--x-compact'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      fontFamily='periodic-heading__h4--museo'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      fontFamily='periodic-heading__h4--museo'
      lineHeight='periodic-heading__h4--compact'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h4'
      fontFamily='periodic-heading__h4--museo'
      lineHeight='periodic-heading__h4--x-x-compact'>H4 - The quick brown fox.</Heading>
    <Heading
      level='h5'
      fontWeight='periodic-heading__h5--bold'>H5 - The quick brown fox.</Heading>
    <Heading
      level='h5'
      fontWeight='periodic-heading__h5--bold'
      lineHeight='periodic-heading__h5--compact'>H5 - The quick brown fox.</Heading>
    <Heading level='h5'>H5 - The quick brown fox.</Heading>
    <Heading
      level='h5'
      lineHeight='periodic-heading__h5--compact'>H5 - The quick brown fox.</Heading>
    <Heading
      level='h5'
      fontWeight='periodic-heading__h5--light'>H5 - The quick brown fox.</Heading>
    <Heading
      level='h5'
      fontWeight='periodic-heading__h5--light'
      lineHeight='periodic-heading__h5--compact'>H5 - The quick brown fox.</Heading>
    <Heading
      level='h5'
      fontFamily='periodic-heading__h5--museo'>H5 - The quick brown fox.</Heading>
    <Heading
      level='h5'
      fontFamily='periodic-heading__h5--museo'
      lineHeight='periodic-heading__h5--compact'>H5 - The quick brown fox.</Heading>
    <Heading
      level='h6'
      fontWeight='periodic-heading__h6--bold'>H6 - The quick brown fox.</Heading>
    <Heading
      level='h6'
      fontWeight='periodic-heading__h6--bold'
      lineHeight='periodic-heading__h6--compact'>H6 - The quick brown fox.</Heading>
    <Heading level='h6'>H6 - The quick brown fox.</Heading>
    <Heading
      level='h6'
      lineHeight='periodic-heading__h6--compact'>H6 - The quick brown fox.</Heading>
    <Heading
      level='h6'
      fontWeight='periodic-heading__h6--light'>H6 - The quick brown fox.</Heading>
    <Heading
      level='h6'
      fontWeight='periodic-heading__h6--light'
      lineHeight='periodic-heading__h6--compact'>H6 - The quick brown fox.</Heading>
    <Heading
      level='h6'
      fontFamily='periodic-heading__h6--museo'>H6 - The quick brown fox.</Heading>
    <Heading
      level='h6'
      fontFamily='periodic-heading__h6--museo'
      lineHeight='periodic-heading__h6--compact'>H6 - The quick brown fox.</Heading>
  </div>
  ```
</docs>
