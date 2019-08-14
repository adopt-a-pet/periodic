<template>
  <component
    :is="tag"
    :href="href"
    :type="type"
    :class="[b({ color, size }).toString(), state]"
    :disabled="disabled"
    :service="service"
    @click="click">
    <Icon
      :class="b('check').toString()"
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
  },
};
</script>

<docs>
```vue
<template>
  <div>
    <SocialButton service="google" color="blue">Google</SocialButton> <br />
    <SocialButton service="google" color="blue">Google</SocialButton> <br />
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
