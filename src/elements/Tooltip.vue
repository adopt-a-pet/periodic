<template>
  <div :class="b().toString()">
    <div
      v-show="showBubble"
      :id="uid"
      :class="`bubble-container ${orientation}`">
      <div class="bubble">
        <div class="content">
          <slot />
        </div>
      </div>
      <div class="caret" />
    </div>

    <div
      class="icon-container"
      @mouseleave="toggleBubble(false)"
      @mouseover="toggleBubble(true)">
      <div class="hover-area" />
      <Icon :name="icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  blockName: 'tooltip',
  status: 'under-review',
  release: '1.0.0',
  model: {
    event: 'change',
  },
  props: {
    /**
     * The icon to use for the tooltip.
     */
    icon: {
      type: String,
      default: 'info',
    },
  },
  data() {
    return {
      orientation: 'from-right',
      showBubble: false,
    };
  },
  computed: {
    uid() {
      return Math.random().toString(36).substr(2, 9);
    },
  },
  methods: {

    /**
     * Check that an object is within the viewport
     */
    isInViewport(elem) {
      const bounding = elem.getBoundingClientRect();
      return (
        bounding.top >= 0
        && bounding.left >= 0
        && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        && bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },

    /**
     * Toggle bubble state and orient it for the screen
     */
    toggleBubble(showBubble) {
      this.showBubble = showBubble;
      this.$nextTick(() => {
        const elem = document.getElementById(this.uid);
        const isInViewport = this.isInViewport(elem);
        this.orientation = isInViewport ? 'from-right' : 'from-left';
      });
    },
  },
};
</script>

<docs>
  ```jsx
  <Tooltip>{{ this.$filler.title }}</Tooltip>
  ```
</docs>
