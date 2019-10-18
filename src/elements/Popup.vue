<template>
  <div :class="b().toString()">
    <div :class="b('bubble-container').toString()">
      <div :class="b('bubble').toString()">
        <div :class="b('content').toString()">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  blockName: 'popup',
  status: 'under-review',
  release: '1.0.0',
  model: {
    event: 'change',
  },
  props: {
    /**
     * The icon to use for the popup.
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
  <Popup>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
  </Popup>
  ```
</docs>
