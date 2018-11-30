<template>
  <div
    :class="[
      b({'align': 'top'}).is({ active: true }).toString(),
    ]"
    role="dialog"
    aria-hidden="true">

    <div :class="b('dialog').toString()">
      <div :class="b('content').toString()">
        <header>
          <slot name="header" />

          <span
            :class="b('close').toString()"
            @click="close">

            <img
              :class="b('close-svg').toString()"
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
 * Example component is used to visually communicate core parts of the product
 * and available actions.
 */
export default {
  name: 'Modal',
  blockName: 'modal-popup',
  status: 'under-review',
  release: '1.0.0',
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<docs>
  ```jsx
  <Modal v-if="false">
    <template slot="header">
      <span>This is in the header</span>
    </template>

    <h1>Something</h1>

    <RadioGroup
      name="example"
      :items="[ { display: 'Green', value: 'a' }, { display: 'Blue', value: 'b' } ]" />
  </Modal>
  ```
</docs>
