<template>
  <div
    :class="[
      b({'align': 'top'}).is({ active: open }).toString(),
    ]"
    role="dialog"
    aria-hidden="true">
    <div
      :class="b('dialog').toString()"
      :style="{maxWidth: maxWidth}">
      <div :class="b('content').toString()">
        <header>
          <slot name="header" />

          <span
            :class="b('close').toString()"
            @click="close">
            <img
              :class="b('close-svg').toString()"
              alt="close modal"
              src="https://images-ra.adoptapet.com/images/close.svg">
          </span>
        </header>

        <main>
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * An empty modal component to be used for anything!
 */
export default {
  name: 'Modal',
  blockName: 'modal-popup',
  status: 'under-review',
  release: '1.0.0',
  props: {
    /**
     * Max width of the modal
     */
    maxWidth: {
      type: String,
      default: null,
    },

    /**
     * Should the modal be open or closed.
     */
    open: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    close() {
      /**
       * Modal closed
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
```vue
<template>
  <div>
    <Modal :open.sync="modal">
      <template slot="header">
        <span>This is in the header</span>
      </template>

      <h1>Something</h1>

      <RadioGroup
        name="example"
        :items="[ { display: 'Green', value: 'a' }, { display: 'Blue', value: 'b' } ]"
      />
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false // Change this to true to open the modal
    };
  }
};
</script>
```
</docs>
