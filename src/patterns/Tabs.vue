<template>
  <div :class="b().toString()">
    <header>
      <span
        v-for="(tab, i) in tabs"
        :key="i"
        :class="b('links').is({ selected: tabSelected(tab) }).toString()"
        @click="changeTab(tab)">
        <Paragraph
          tag="span"
          font-family="museo"
          font-weight="bold">
          {{ tab.display }}
        </Paragraph>
      </span>
    </header>

    <VSpacer size="s" />

    <div
      v-for="(tab, i) in tabs"
      :key="i">
      <div
        v-show="tabSelected(tab)">
        <slot :name="tab.tab" />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Tabs
 */

export default {
  name: 'Tabs',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'tabs',
  props: {
    /**
     * Name and display of the tabs. `display` is what users see and `tab` will
     * be the slot name used for content.
     *
     * ```
     * [ { display: 'Search Dogs', tab: 'search-dogs' } ]
     *```
     */
    tabs: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      selected: this.tabs[0].tab,
    };
  },

  computed: {},

  methods: {
    tabSelected({ tab }) {
      return tab === this.selected;
    },

    changeTab({ tab }) {
      this.selected = tab;
    },
  },
};
</script>

<docs>
```vue
<template>
  <div>
    <Tabs :tabs="tabs" >
      <template slot="dogs">
        Here be dogs
      </template>

      <template slot="cats">
        Here be cats
      </template>
    </Tabs>
  </div>
</template>
<script>
export default {
  computed: {
    tabs() {
      return [
        { display: 'Dogs', tab: 'dogs' },
        { display: 'Cats', tab: 'cats' }
      ]
    }
  }
};
</script>
```
</docs>
