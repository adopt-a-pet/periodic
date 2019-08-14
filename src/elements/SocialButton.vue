<template>
  <component
    :is="tag"
    :href="href"
    :type="type"
    :class="[b({ color, size, textColor}).toString(), state]"
    :disabled="disabled"
    :service="service"
    @click="click">
    <Icon
      :class="b('social-icon').toString()"
      :name="'service-' + service" />
    <slot />
  </component>
</template>

<script>
import Button from './Button';
/**
 * Buttons are generally used for interface actions. Suitable for all-purpose use.
 * Defaults to green/large.
 */
export default {
  name: 'SocialButton',
  blockName: 'button',
  status: 'under-review',
  release: '1.0.0',
  extends: Button,
  props: {
    /**
     * Pass in the string value of the service we want
     * this button to be used for. (Google or Facebook)
     */
    service: {
      type: String,
      default: null,
      validator: value => value.match(/(google|facebook)/),
    },
    /**
     * Color allows us to easily change the color.
     * `color`
     */
    color: {
      type: String,
      default: 'green',
      validator: value => value.match(/(green|blue|orange|white)/),
    },
    /**
     * Easily change the text color.
     */
    textColor: {
      type: String,
      default: '#fff',
    },
  },
  computed: {

  },
};
</script>

<docs>
```vue
<template>
  <div>
    <SocialButton service="google" color="white" textColor="google">Google</SocialButton> <br />
    <SocialButton service="facebook" color="white" textColor="fb">Facebook</SocialButton> <br />
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
};
</script>
```
</docs>
