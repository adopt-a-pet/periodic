<template>
  <div
    :class="[
      b({'align': 'top'}).toString(),
      'periodic-modal-popup__trigger--active periodic-modal-popup--active'
    ]"
    role="dialog"
    aria-hidden="true">

    <div class="modal-popup__dialog container">
      <div class="modal-popup__content modal-popup__content--active">
        <header>
          <div
            class="sticky-close">

            <slot name="header" />

            <a
              href="javascript:;"
              class="modal-popup__close modal-close-position e-modal__closer gtm-close">
              <img
                src="https://images-ra.adoptapet.com/images/close.svg"
                class="modal-popup__close-svg">
            </a>
          </div>
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
