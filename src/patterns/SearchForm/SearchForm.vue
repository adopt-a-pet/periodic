<template src="./SearchForm.html" />
<script>
export default {
  name: 'SearchForm',
  blockName: 'search-form',
  status: 'under-review',
  release: '1.0.0',
  data() {
    this.getData();
    const distances = [
      {
        display: '35 miles or less',
        value: 35,
      },
      {
        display: '50 miles or less',
        value: 50,
      },
      {
        display: '75 miles or less',
        value: 75,
      },
      {
        display: '100 miles or less',
        value: 100,
      },
      {
        display: '250 miles or less',
        value: 250,
      },
    ];
    return {
      includeMixes: false,
      sectionIndex: 0,
      subsectionClanId: null,
      allAges: [],
      allColors: [],
      allBreeds: [],
      allHair: [],
      allSizes: [],
      clans: [],
      distances,
      fields: {
        clanId: 1,
        distance: distances[0].value,
      },
      sections: [
        {
          clanId: 1,
          display: 'Dogs',
        },
        {
          clanId: 2,
          display: 'Cats',
        },
        {
          clanId: null,
          display: 'Others',
        },
      ],
      sexes: [
        {
          display: 'Male',
          value: 'male',
        },
        {
          display: 'Female',
          value: 'female',
        },
      ],
      validations: {
        location: {
          required: true,
          async isUnique(value) {
            if (value === '') return true;
            const response = await this.$syscall('api/location/validate', this.fields.zipcode);
            return Boolean(await response.json());
          },
        },
      },
    };
  },
  computed: {
    /**
     * Breeds
     */
    breeds() {
      const filtered = this.allBreeds.filter(item => item.clanId === this.fields.clanId);
      return this.formatList(filtered, 'breedName', 'breedId');
    },

    /**
     * Sizes
     */
    sizes() {
      const filtered = this.allSizes.filter(item => item.clanId === this.fields.clanId);
      return this.formatList(filtered, 'petSizeRangeName', 'sizeId');
    },

    /**
     * Colors
     */
    colors() {
      const filtered = this.allColors.filter(item => item.clanId === this.fields.clanId);
      return this.formatList(filtered, 'colorName', 'colorId');
    },

    /**
     * Ages
     */
    ages() {
      const filtered = this.allAges.filter(item => item.clanId === this.fields.clanId);
      return this.formatList(filtered, 'age');
    },

    /**
     * Hairs
     */
    hair() {
      const filtered = this.allHair.filter(item => item.clanId === this.fields.clanId);
      return this.formatList(filtered, 'hairName', 'hairId');
    },
  },
  methods: {
    /**
     * Get API data
     */
    getData() {
      this.$syscall('api/pets/getClans')
        .then(response => {
          this.clans = this.formatList(response, 'clanName', 'clanId');
          this.clans.splice(0, 2); // remove 'Dogs' and 'Cats'

          // create array of clan ID's
          const array = response.slice(0);
          const clanIds = [];
          array.forEach(clan => {
            clanIds.push(clan.clanId);
          });

          // get breeds
          this.$syscall('api/pets/getBreeds', clanIds)
            .then(res => {
              this.allBreeds = res;
            });

          // get sizes
          this.$syscall('api/pets/getSizes', clanIds)
            .then(res => {
              this.allSizes = res;
            });

          // get colors
          this.$syscall('api/pets/getColors', clanIds)
            .then(res => {
              this.allColors = res;
            });

          // get ages
          this.$syscall('api/pets/getAges', clanIds)
            .then(res => {
              this.allAges = res;
            });

          // get hair
          this.$syscall('api/pets/getHair', clanIds)
            .then(res => {
              this.allHair = res;
            });
        });
    },

    /**
     * Format list
     */
    formatList(list, display, value) {
      const v = value || display;
      const formatted = [];
      list.forEach(item => {
        formatted.push({
          display: this.$options.filters.capitalize(item[display]),
          value: item[v],
        });
      });
      return formatted;
    },

    /**
     * Change section
     */
    changeSection(index) {
      this.sectionIndex = index;
      this.fields.clanId = this.sections[index].clanId;
      this.resetFields();
    },

    /**
     * Change section
     */
    changeSubsection(clanId) {
      this.subsectionClanId = clanId;
      this.resetFields();
    },

    /**
     * Reset fields
     */
    resetFields() {
      this.fields.breedId = null;
      this.fields.sizeId = null;
      this.fields.colorId = null;
      this.fields.age = null;
      this.fields.hairId = null;
    },
  },
};
</script>

<docs>
  ```vue
  <div style="background: #fff">
    <SearchForm />
  </div>
  ```
</docs>
