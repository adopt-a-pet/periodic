<template>
  <div
    :class="b({ type }).toString()" />
</template>

<script>
export default {
  name: 'VDivider',
  blockName: 'vdivider',
  status: 'under-review',
  release: '1.0.0',
  props: {
    /**
     * The type of divider. Defaults to solid line.
     * `dashed`
     */
    type: {
      type: String,
      default: null,
    },
  },
};
</script>

<docs>
```vue
<template>
  <div>
    <VDivider />
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
