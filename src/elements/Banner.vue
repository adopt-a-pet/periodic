<template>
  <div
    :class="[
      bannerName,
      b({'align': 'top', color}).is({active: open}).toString(),
    ]"
    role="banner"
    aria-hidden="true"
    @maybeshowbanner="maybeShow">
    <div :class="b('wrapper').toString()">
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
     * Should the visible.
     */
    open: {
      type: Boolean,
      default: true,
    },
    /**
     * Color allows us to easily change the color.
     * `color`
     */
    color: {
      type: String,
      default: 'orange',
      validator: value => value.match(/(green|blue|orange|grey)/),
    },
    /**
     * Event name to trigger opening of this object
     */
    bannerName: {
      type: String,
      default: null,
    },
  },
  methods: {
    close() {
      if (typeof window.sessionStorage !== 'undefined') {
        window.sessionStorage.setItem('aap_donation_banner_dismissed', true);
      }
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
    maybeShow() {
      if (typeof window.sessionStorage !== 'undefined' && window.sessionStorage.getItem('aap_donation_banner_dismissed') === null) {
        this.$emit('update:open', true);
      }
    },
  },
};
</script>

<docs>
```vue
<template>
  <div>
    <Banner
    :open.sync="banner"
    color="orange"
    bannerName="testBannerName">
      <template slot="header">
        <Heading level="h3">Something</Heading>
      </template>
      <template slot="main">
        <Heading level="h4">Test content</Heading>
        <Button color="green" size="small">Submit</Button>
      </template>
    </Banner>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: false, // Change this to true to show the banner
    }
  }
};
</script>
```
</docs>
