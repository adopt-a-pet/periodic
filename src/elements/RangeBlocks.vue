<template>
  <div
    data-seo="data-chart-section"
    class="data-chart__section">
    <div
      class="data-chart__column"
      :class="rangeIncludes(1)">
      <span class="data-chart__column--text data-chart__column--text-min h5--bold">{{ leftLabel }}</span>
    </div>
    <div
      class="data-chart__column"
      :class="rangeIncludes(2)" />
    <div
      class="data-chart__column"
      :class="rangeIncludes(3)" />
    <div
      class="data-chart__column"
      :class="rangeIncludes(4)" />
    <div
      class="data-chart__column"
      :class="rangeIncludes(5)" />
    <div
      class="data-chart__column"
      :class="rangeIncludes(6)" />
    <div
      class="data-chart__column"
      :class="rangeIncludes(7)" />
    <div
      class="data-chart__column"
      :class="rangeIncludes(8)" />
    <div
      class="data-chart__column"
      :class="rangeIncludes(9)" />
    <div
      class="data-chart__column"
      :class="rangeIncludes(10)">
      <span class="data-chart__column--text data-chart__column--text-max h5--bold">{{ rightLabel }}</span>
    </div>
  </div>
</template>

<script>
/**
 * Buttons are generally used for interface actions. Suitable for all-purpose use.
 * Defaults to green/large.
 */
export default {
  name: 'RangeBlocks',
  blockName: 'range-blocks',
  status: 'under-review',
  release: '1.0.0',
  props: {
    /**
     * The left label.
     * `Min, Worst`
     */
    leftLabel: {
      type: String,
      default: 'Min',
    },
    /**
     * The right label.
     * `Max, Best`
     */
    rightLabel: {
      type: String,
      default: 'Max',
    },
    /**
     * Select the range of blocks that will be colored in blue.
     */
    range: {
      type: String,
      default: '1,5',
    },
  },

  methods: {
    click() {
      if (this.disabled) return;
      /**
       * Click event
       *
       * @event click
       * @type none
       */
      this.$emit('click');
    },
    rangeIncludes(blockNumber) {
      // if (this.range.includes(blockNumber)) {
      //     return 'data-chart__column--active';
      //
      let rangeItems = this.range;
      const newArray = [];
      if (!Array.isArray(rangeItems)) {
        rangeItems = rangeItems.split(',');
        rangeItems.forEach(element => {
          // console.log(element);
          newArray.push(parseInt(element, 10));
        });
        // console.log(newArray);
      }
      if (blockNumber >= rangeItems[0] && blockNumber <= rangeItems[1]) {
        return 'data-chart__column--active';
      }
      return false;
    },
  },
};
</script>

<docs>
```vue
<template>
  <div>
    <RangeBlocks>Default</RangeBlocks> <br />
    <RangeBlocks leftLabel="Worst" rightLabel="Best" :range="bestWorstRange"></RangeBlocks> <br />
    <RangeBlocks leftLabel="Low" rightLabel="High" range="4,6"></RangeBlocks> <br />
  </div>
</template>
<script>
export default {
  data() {
    return {
        bestWorstRange: "1,4"
    }
  }
};
</script>
```
</docs>
