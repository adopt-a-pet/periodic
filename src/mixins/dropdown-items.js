
export default {
  methods: {
    dropdownItemsFromRange(start, end) {
      // If we want `1, 9` to actually give us 1 through 9, we have to add 1 to
      // `end`. Because otherwise 9 - 1 (end - start) would be 8.
      const total = (end + 1) - start;

      return Array(total).fill().map((n, i) => {
        // `start` acts as our offset when adding the index to it
        const value = start + i;

        return { value, display: value };
      });
    },
  },
};
