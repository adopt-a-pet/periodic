<template>
  <div :class="[b().toString(), headerPlacement]">
    <div
      :class="{ open }"
      class="header"
      @click="open = !open">
      <Icon name="angle-down" />
      <slot name="header" />
    </div>
    <div
      :ref="ref"
      :style="style"
      class="main">
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
/**
 * A widget the expands and collapses when you click on it.
 */
export default {
  name: 'Accordion',
  blockName: 'accordion',
  status: 'under-review',
  release: '1.0.0',
  props: {
    /**
     * Whether the accordion's header should stay above the content or slide
     * beneath the content; options: ['above', 'below']
     */
    headerPlacement: {
      type: String,
      default: 'above',
    },
  },
  data() {
    return {
      height: null,
      ref: `${this.blockName}-main`,
      open: true,
    };
  },
  computed: {
    style() {
      if (!this.open) {
        return {
          'max-height': 0,
          overflow: 'hidden',
          transition: 'opacity .5s, max-height ease-in .5s',
          opacity: 0,
        };
      }
      return {
        'max-height': `${this.height}px`,
        transition: 'opacity 1s, max-height ease-out .5s',
        overflow: 'hidden',
        opacity: 1,
      };
    },
  },
  mounted() {
    this.height = this.$refs[this.ref].clientHeight;
    this.open = false;
  },
};
</script>

<docs>
```vue
<template>
  <div>
    <Accordion>
      <template slot="header">Top Header</template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </Accordion>
    <Accordion header-placement="below">
      <template slot="header">Bottom Header</template>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Accordion>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //
    };
  }
};
</script>
```
</docs>
