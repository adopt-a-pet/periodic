<template>
  <div :class="b().toString()">
    <div
      v-if="showBubble"
      :class="b('bubble-container').toString()">

      <div
        :class="b('bubble').toString()">

        <div :class="b('content').toString()">
          <slot />
        </div>
      </div>
    </div>

    <span
      @mouseleave="showBubble = false"
      @mouseover="showBubble = true">

      <Icon :name="icon" />
    </span>
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
      showBubble: false,
    };
  },
};
</script>

<docs>
  ```jsx
  <InfoBubble>Hi</InfoBubble>
  ```
</docs>
