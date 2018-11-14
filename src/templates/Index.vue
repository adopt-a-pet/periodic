<template>
  <component :is="type"> </component>
</template>

<script>
/**
 * Shows how to layout and structure a home page.
 */
export default {
  name: 'Index',
  status: 'deprecated',
  release: '1.0.0',
  metaInfo: {
    title: 'Vue Design System',
    htmlAttrs: {
      lang: 'en',
    },
  },
  props: {
    /**
     * The html element name used for the component.
     */
    type: {
      type: String,
      default: 'div',
    },
  },
};
</script>

<docs>
  ```jsx
  <Index />
  ```
</docs>
