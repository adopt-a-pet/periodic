<template>
  <component
    :is="tag"
    :href="href"
    :type="type"
    :class="[b({ color, size }).toString(), state]"
    :disabled="disabled"
    :service="service"
    @click="click">
    <Icon :name="'service-' + service" />
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
    <Button>Default</Button> <br />
    <Button state="hover">:hover</Button> <br />
    <Button state="active">:active</Button> <br />
    <Button size="small">Small</Button> <br />
    <Button :disabled="true">Disabled</Button> <br />
    <Button :disabled="true" size="small">Small Disabled</Button> <br />
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
