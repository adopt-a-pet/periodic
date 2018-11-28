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
          <span
            :class="b('close').toString()">

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
  props: {
  },
};
</script>

<docs>
  ```jsx
  <Modal> Docs section should have an example that is shown in the documentation. </Modal>
  ```
</docs>
