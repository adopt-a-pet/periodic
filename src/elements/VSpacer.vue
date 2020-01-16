|<template>
  <component
    :is="tag"
    :style="{ lineHeight: height, height: height, width: '100%' }">
    <slot />
  </component>
</template>

<script>

/**
 * Adds a standard amount of verticals space between elements
 */
export default {
  name: 'VSpacer',
  status: 'under-review',
  release: '1.0.0',
  props: {
    /**
     * The html element used for the spacer.
     */
    tag: {
      type: String,
      default: 'div',
    },
    /**
     * The size of the button. Defaults to large.
     * `xxxxs, xxxs, xxs, xs, s, m, l, xl, xxl, xxxl, xxxxl`
     */
    size: {
      type: String,
      default: 'm',
      validator: value => value.match(/(xxxxs|xxxs|xxs|xs|s|m|l|xl|xxl|xxxl|xxxxl|xxxxxl|xxxxxxl|)/),
    },
  },

  computed: {
    height() {
      return this[`$space_${this.size}`];
    },
  },
};
</script>

<docs>
  ```jsx
  <div>
    <VSpacer size="xxxxs" class="space"><span>size: xxxxs</span></VSpacer>
    <VSpacer size="xxxs" class="space"><span>size: xxxs</span></VSpacer>
    <VSpacer size="xxs" class="space"><span>size: xxs</span></VSpacer>
    <VSpacer size="xs" class="space"><span>size: xs</span></VSpacer>
    <VSpacer size="s" class="space"><span>size: s</span></VSpacer>
    <VSpacer class="space"><span>size: m (default)</span></VSpacer>
    <VSpacer size="l" class="space"><span>size: l</span></VSpacer>
    <VSpacer size="xl" class="space"><span>size: xl</span></VSpacer>
    <VSpacer size="xxl" class="space"><span>size: xxl</span></VSpacer>
    <VSpacer size="xxxl" class="space"><span>size: xxxl</span></VSpacer>
    <VSpacer size="xxxxl" class="space"><span>size: xxxxl</span></VSpacer>
  </div>
  ```
</docs>
