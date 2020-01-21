<template>
  <div v-if="filters.clan === 1 || filters.clan === 2">
    <Paragraph
      font-size="s"
      font-weight="bold"
      line-height="24px"
      style="margin-bottom: 10px">
      You’re searching for
    </Paragraph>

    <Paragraph
      font-weight="bold"
      line-height="26px"
      style="margin-bottom: 0">
      <TextLink
        :class="b('search-params').toString()"
        @click="searchFilters">
        {{ clanName }}s: {{ petDescription }} - within {{ geoRange }} miles of {{ filters.zipCode }}
      </TextLink>
    </Paragraph>
  </div>
</template>
<script>
export default {
  name: 'SearchQuerySentence',
  blockName: 'search-query-sentence',
  status: 'under-review',
  release: '1.0.0',
  props: {
    /**
     * A list of search paramaters from the user's search criteria
     *
     * ```
     * {
     *     age: ['young', 'senior'],
     *     bondedPair: true,
     *     breeds: [187],
     *     clan: 1,
     *     color: [1,2],
     *     geoRange: 10,
     *     sex: ['f'],
     *     specialNeeds: true,
     *     zipCode: '90210',
     *  }
     * ```
     */
    filters: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      colorsMap: {},
      breedMap: {},
    };
  },
  computed: {
    sizeMap() {
      return {
        1: 'Small',
        2: 'Medium',
        3: 'Large',
        4: 'X-Large',
      };
    },
    sexFullName() {
      if (!this.filters.sex) return '';

      let name = '';

      switch (this.filters.sex.join()) {
        case '':
          name = '';
          break;

        case 'm':
          name = 'Male';
          break;

        case 'f':
          name = 'Female';
          break;

        default:
          name = 'Male or Female';
      }

      return name;
    },
    age() {
      return this.filters.age ? this.filters.age.map(this.$options.filters.capitalize).join(' or ') : null;
    },
    hairNames() {
      return this.filters.hair ? this.filters.hair.map(this.$options.filters.capitalize).join(' or ') : null;
    },
    colorNames() {
      if (!this.filters.color) return '';

      return this.filters.color
        .map(colorId => this.colorsMap[colorId])
        .join(' or ');
    },
    familyNames() {
      if (this.filters.breeds) {
        return this.filters.breeds
          .map(breedId => this.breedMap[breedId])
          .sort()
          .join(' or ');
      }
      return '';
    },
    hasMoreFiltersThanClan() {
      return Boolean(
        this.age || this.sexFullName || this.colorNames || this.familyNames || this.sizeNames || this.hairNames,
      );
    },
    clanName() {
      let name;

      switch (this.filters.clan) {
        case 1:
          name = 'dog';
          break;

        case 2:
          name = 'cat';
          break;

        default:
          name = 'pet';
      }

      return name;
    },
    sizeNames() {
      if (!(this.filters.size && this.filters.size.length)) return '';

      return this.filters.size
        .map(sizeId => this.sizeMap[sizeId])
        .join(' or ');
    },
    geoRange() {
      return this.filters.geoRange === -1 ? 3500 : this.filters.geoRange;
    },
    bondedPair() {
      return this.filters.bondedPair ? 'bonded pair' : '';
    },

    specialNeeds() {
      return this.filters.specialNeeds ? 'with special needs' : '';
    },
    petDescription() {
      if (this.hasMoreFiltersThanClan) {
        return [
          this.familyNames,
          this.sexFullName,
          this.age,
          this.colorNames,
          this.sizeNames,
          this.hairNames,
        ]
          .filter(a => !!a)
          .join(', ');
      }
      return 'All';
    },
  },
  created() {
    /**
     * Get colors name and Ids from database
     *
     * @syscall api/pets/colors
     * @param {Number}
     * @returns {{colorId: Number, colorName: String}}
     */
    this.$syscall('api/pets/getColors', this.filters.clan)
      .then(response => {
        this.colorsMap = response.reduce(
          (acc, { colorId, colorName }) => Object.assign(acc, { [colorId]: colorName }),
          {},
        );
      });

    /**
     * Get Breed name and Ids from database
     *
     * @syscall api/pets/getBreeds
     * @param {Number}
     * @returns {{breedId: Number, breedName: String}}
     */
    this.$syscall('api/pets/getBreeds', this.filters.clan).then(response => {
      this.breedMap = response.reduce(
        (acc, { breedId, breedName }) =>
          Object.assign(acc, { [breedId]: breedName }),
        {},
      );
    });
  },
  methods: {
    searchFilters() {
      /**
       * When user clicks "Edit Search filters"
       *
       * @event click:searchFilters
       * @type none
       */
      this.$emit('click:searchFilters');
    },
  },
};
</script>

<docs>
```vue
<template>
<SearchQuerySentence
  :filters='filters' />
</template>
<script>
export default {
  data() {
    return {
      filters: {
        age: ['young', 'senior'],
        bondedPair: true,
        breeds: [187, 1],
        clan: 1,
        color: [153],
        geoRange: 10,
        hair: ['short'],
        sex: ['f'],
        specialNeeds: true,
        size: [1, 2],
        zipCode: '90210',
      },
    }
  }
};
</script>
```
</docs>
