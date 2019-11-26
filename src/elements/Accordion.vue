<template>
  <div :class="[b().toString(), headerPlacement]">
    <div
      :class="{ open }"
      class="header"
      @click="toggle">
      <Icon
        name="angle-down"
        :fill="tokens.color_primary_blue" />
      <slot
        v-if="headerPlacement === 'above' || (headerPlacement === 'below' && !open)"
        name="header" />
      <span v-else>Close</span>
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
import tokens from '@/assets/tokens/tokens.json';

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
      style: null,
      tokens,
    };
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.open = false;
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    /**
     * Toggle accordion
     */
    toggle() {
      this.open = !this.open;
      this.onResize({ toggle: true });
    },

    /**
     * Resize accordion content to allow for dynamic heights
     */
    onResize(event) {
      if (this.open) {
        this.style = {
          'max-height': 'inherit',
        };
        this.$nextTick(() => {
          this.height = this.$refs[this.ref].clientHeight;
          this.style = {
            'max-height': 0,
            opacity: 0,
          };
          setTimeout(() => {
            this.style = {
              'max-height': `${this.height}px`,
              overflow: 'hidden',
              opacity: 1,
            };
            if (event.toggle) {
              this.style.transition = 'opacity 1s, max-height .5s';
            }
          });
        });
      } else {
        this.style = {
          'max-height': 0,
          overflow: 'hidden',
          opacity: 0,
          transition: 'opacity 1s, max-height .5s',
        };
      }
    },
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
