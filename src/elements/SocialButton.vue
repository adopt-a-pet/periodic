<template>
  <component
    :is="tag"
    :href="href"
    :type="type"
    :class="b({ color: 'white', size, 'text-color': textColor}).toString()"
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
    <SocialButton service="google" color="white" text-color="google">Google</SocialButton> <br />
    <SocialButton service="facebook" color="white" text-color="fb">Facebook</SocialButton> <br />
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
