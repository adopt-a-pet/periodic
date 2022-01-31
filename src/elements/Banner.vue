<template>
  <div
    :class="b({color}).toString()"
    role="banner"
    aria-hidden="true">
    <div :class="b('wrapper').toString()">
      <div :class="b('content').toString()">
        <header>
          <slot name="header" />

          <span
            :class="b('close').toString()"
            @click="close">

            <img
              :class="b('close-svg').toString()"
              alt="hide banner"
              src="https://images-ra.adoptapet.com/images/close.svg">
          </span>
        </header>
        <main>
          <slot name="main" />
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
  name: 'Banner',
  blockName: 'banner-popup',
  status: 'under-review',
  release: '1.0.0',
  props: {
    /**
     * Color allows us to easily change the color.
     * `color`
     */
    color: {
      type: String,
      default: 'yellow',
      validator: value => value.match(/(orange|grey|yellow)/),
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
    },
  },
};
</script>

<docs>
```vue
<template>
  <div>
    <Banner
    v-if="banner"
    v-on:close="closeDonationBanner"
    color="yellow">
      <template slot="header">
      </template>
      <template slot="main">
        <div>
          <Heading level="h3">Something</Heading>
          <Heading level="h4">Test content</Heading>
        </div>
        <Button color="green" size="small">Submit</Button>
      </template>
    </Banner>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: true, // Change this to true to show the banner
    }
  }
};
</script>
```
</docs>
