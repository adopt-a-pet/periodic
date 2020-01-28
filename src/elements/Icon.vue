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
    let style = '';

    if (this.fill) {
      style += `fill: ${this.fill}; `;
    }
    if (this.height !== null) {
      style += `height: ${this.height}; `;
    }
    if (this.width !== null) {
      style += `width: ${this.width}; `;
    }
    if (style !== '') {
      svg = svg.replace(/<svg /, `<svg style="${style}" `);
    }
    return {
      svg,
    };
  },
};
</script>

<docs>
  ```jsx
  <div>
    <div>
      <div
        v-for="icon of $icons"
        style="display: inline-block; margin: 1em .5em; text-align: center; width: 100px;"
      >
        <a :href="`/icons/${icon}.svg`">
          <Icon width="50px" height="50px" :name="icon"/>
        </a>
        <div>{{ icon }}</div>
    </div>
  </div>
  ```
</docs>
