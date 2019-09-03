<template>
  <component
    :is="type"
    :aria-label="ariaLabel"
    :class="[b().toString()]"
    :style="{width, height}"
    @click="$emit('click', $event)"
    v-html="svg" />
</template>

<script>
const req = require.context('@/assets/icons/', true, /^\.\/.*\.svg$/);
/**
 * Icons are used to visually communicate core parts of the product and
 * available actions. They can act as wayfinding tools to help users more
 * easily understand where they are in the product.
 */
export default {
  name: 'Icon',
  blockName: 'icon',
  status: 'review',
  release: '1.0.0',
  props: {
    /**
     * The name of the icon to display.
     */
    name: {
      type: String,
      required: true,
      default: 'settings',
    },
    /**
     * The fill color of the SVG icon.
     */
    fill: {
      type: String,
      default: null,
    },
    /**
     * Descriptive text to be read to screenreaders.
     */
    ariaLabel: {
      type: String,
      default: 'icon',
    },
    /**
     * The html element name used for the icon.
     */
    type: {
      type: String,
      default: 'span',
    },
    /**
     *  Easily set the width of the icon.
     */
    width: {
      type: String,
      default: null,
    },
    /**
     *  Easily set the height of the icon.
     */
    height: {
      type: String,
      default: null,
    },
  },
  data() {
    let svg = req(`./${this.name}.svg`);
    let style = `height: ${this.height}; width: ${this.width}`;

    if (this.fill) {
      style += `; fill: ${this.fill}`;
    }
    svg = svg.replace(/<svg /, `<svg style="${style}" `);
    return {
      svg,
    };
  },
};
</script>

<docs>
  ```jsx
  <div>
    <Icon name="ready" aria-label="Component is ready" fill="#7cb518" />
    <Icon name="review" fill="rgb(255,186,10)" />
    <Icon name="deprecated" fill="rgb(235,59,36)" />
    <Icon name="prototype" fill="rgb(37,138,239)" />
    <Icon name="service-google" />
  </div>
  ```
</docs>
