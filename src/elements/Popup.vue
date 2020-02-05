<template>
  <div
    v-show="open"
    :class="b().toString()">
    <div :class="b('bubble-container').toString()">
      <div :class="b('bubble').toString()">
        <div :class="b('content').toString()">
          <slot />
        </div>
        <div class="caret" />
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
     * Should the popup be open or closed.
     */
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showBubble: false,
    };
  },
  methods: {
    close() {
      /**
       * Popup closed
       *
       * @event close
       * @type none
       */
      this.$emit('close');

      /**
       * Same as `@close` but allows components to use `:open.sync=""`
       *
       * @event update:open
       * @type Boolean
       */
      this.$emit('update:open', false);
    },
  },
};
</script>

<docs>
  ```jsx
  <template>
    <div>
      <VSpacer size="xxxxxxl" />
      <Popup :open.sync="open">
        This bubble could be used for anything.
        <VSpacer />
        <Button size="small">Anything at All</Button>
      </Popup>
      <Paragraph>
        <TextLink @click="open = !open">Click to Reveal</TextLink>
      </Paragraph>
    </div>
  </template>
  <script>
    export default {
      data() {
        return {
          open: false,
        }
      }
    }
  </script>
  ```
</docs>
