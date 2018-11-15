<template>
  <component
    :is="type"
    class="nav">
    <a
      v-for="(item, index) in navItems"
      :key="index"
      :href="item.href"
      :class="{ active: localActive === item.component }"
      v-html="item.name"
    />
  </component>
</template>

<script>
/**
 * Used as main page navigation in templates.
 */
export default {
  name: 'NavBar',
  status: 'ready',
  release: '1.0.0',
  model: {
    prop: 'active',
  },
  props: {
    /**
     * The html element name used for the nav bar.
     */
    type: {
      type: String,
      default: 'nav',
    },
    /**
     * State which tab is active when initiated (using name of the component).
     */
    active: {
      required: true,
      type: String,
    },
    /**
     * Menu items to be displayed on the nav bar.
     */
    navItems: {
      required: true,
      type: Array,
    },
  },
  computed: {
    localActive: {
      get() {
        return this.active;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>

<docs>
  ```jsx
  <NavBar active="Dashboard" :navItems="[]" />
  ```
</docs>
