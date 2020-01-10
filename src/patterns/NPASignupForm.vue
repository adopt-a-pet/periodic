<template>
  <div
    :class="b().toString()" />
</template>

<script>
/**
 * NPA signup form
 */

export default {
  name: 'NPASignupForm',

  props: {
    /**
     * Email to pre-fill in the form.
     */
    email: {
      type: String,
      default: '',
    },
    /**
     * A list of offers in the form of:
     *
     * ```
     * [ { newsletterId: 1, displayHtml: 'Something...' } ]
     *```
     */
    offers: {
      type: Array,
      default: () => [],
    },
    /**
     * A list of newsletterIds that are checked
     */
    optins: {
      type: Array,
      default: () => [],
    },
    /**
     * A list of newsletterIds that are checked
     */
    items: {
      type: Array,
      default: () => [],
    },
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

    /**
     * Which NPA plan to use
     */
    plan: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      form: {
        email: this.email,
        dontShowAgain: false,
        optins: this.optins,
        plan: this.plan,
      },
      colorsMap: {},
      breedMap: {},
    };
  },
  blockName: 'npa-signup',
  status: 'under-review',
  release: '1.0.0',

  // computed: {
  //   sizeMap() {
  //     return {
  //       1: 'small',
  //       2: 'medium',
  //       3: 'large',
  //       4: 'x-large',
  //     };
  //   },
  //
  //   sexFullName() {
  //     if (!this.filters.sex) return '';
  //
  //     let name = '';
  //
  //     switch (this.filters.sex.join()) {
  //       case '':
  //         name = '';
  //         break;
  //
  //       case 'm':
  //         name = 'male';
  //         break;
  //
  //       case 'f':
  //         name = 'female';
  //         break;
  //
  //       default:
  //         name = 'male or female';
  //     }
  //
  //     return name;
  //   },
  //   age() {
  //     return this.filters.age ? this.filters.age.join(' or ') : null;
  //   },
  //   colorNames() {
  //     if (!this.filters.color) return '';
  //
  //     return this.filters.color
  //       .map(colorId => this.colorsMap[colorId])
  //       .join(' or ');
  //   },
  //   familyNames() {
  //     if (!this.filters.breeds) return this.clanName;
  //
  //     return this.filters.breeds
  //       .map(breedId => this.breedMap[breedId])
  //       .join(' or ');
  //   },
  //   hasMoreFiltersThanClan() {
  //     return Boolean(this.age || this.sexFullName || this.colorNames || this.familyNames);
  //   },
  //
  //   clanName() {
  //     let name;
  //
  //     switch (this.filters.clan) {
  //       case 1:
  //         name = 'dog';
  //         break;
  //
  //       case 2:
  //         name = 'cat';
  //         break;
  //
  //       default:
  //         name = 'pet';
  //     }
  //
  //     return name;
  //   },
  //
  //   bondedPair() {
  //     return this.filters.bondedPair ? 'bonded pair' : '';
  //   },
  //
  //   specialNeeds() {
  //     return this.filters.specialNeeds ? 'with special needs' : '';
  //   },
  //
  //   sizeNames() {
  //     if (!(this.filters.size && this.filters.size.length)) return '';
  //
  //     return this.filters.size
  //       .map(sizeId => this.sizeMap[sizeId])
  //       .join(' or ');
  //   },
  //
  //   petDescription() {
  //     return [
  //       this.bondedPair,
  //       this.age,
  //       this.sexFullName,
  //       this.colorNames,
  //       this.sizeNames,
  //       this.familyNames,
  //       this.specialNeeds,
  //     ]
  //       .filter(a => !!a)
  //       .join(' ');
  //   },
  //
  //   npaTypes: () => [
  //     {
  //       heading: 'Premium Alert',
  //       display:
  //         'Get real time, instant notifications when you have a new match with your $10 monthly payment!',
  //       icon: 'clock',
  //       value: 1,
  //     },
  //     {
  //       heading: 'Free Alert',
  //       display:
  //         'We’ll run your pet search daily and send you an email within 24 hours of having a new match.',
  //       icon: 'envelope',
  //       value: 0,
  //     },
  //   ],
  // },

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
     * @returns {{breedId: Number, breedName: String, breedNamePlural: String}}
     */
    this.$syscall('api/pets/getBreeds', this.filters.clan).then(response => {
      this.breedMap = response.reduce(
        (acc, { breedId, breedNamePlural }) =>
          Object.assign(acc, { [breedId]: breedNamePlural }),
        {},
      );
    });
  },

  methods: {
    whatIsThis() {
      /**
       * When user clicks "What is this"
       *
       * @event click:whatIsThis
       * @type none
       */
      this.$emit('click:whatIsThis');
    },
    searchFilters() {
      /**
       * When user clicks "Edit Search filters"
       *
       * @event click:searchFilters
       * @type none
       */
      this.$emit('click:searchFilters');
    },
    skip() {
      /**
       * When user clicks "Skip"
       *
       * @event click:skip
       * @type none
       */
      this.$emit('click:skip');
    },
    dontShowAgain() {
      /**
       * When user changes "Don’t show me this again."  It will send true or false
       *
       * @event change:dontShowAgain
       * @type Boolean
       */
      this.$emit('change:dontShowAgain', this.form.dontShowAgain);
    },
    selectPlan(plan) {
      /**
       * When user changes the NPA plan
       *
       * @event change:plan
       * @type Number
       */
      this.$emit('change:plan', plan);
    },
    submit() {
      if (this.$refs.email.validate()) {
        /**
         * NPA signup submit event
         *
         * @event submit
         * @type {{ email: String, dontShowAgain: Boolean, offers: Array }}
         */
        this.$emit('submit', {
          ...this.form,
          filters: this.filters,
        });
      }
    },
  },
};
</script>

<docs>
```vue
<template>
  <NPASignupForm
    :offers='offers'
    :filters='filters'/>
</template>
<script>
export default {
  data() {
    return {
      offers: [
        {
          newsletterId: 1,
          displayHtml: 'I would like to receive the latest special deals'
        },
        {
          newsletterId: 2,
          displayHtml:
            'Yes, I would like to receive communications from the Petco Foundation'
        }
      ],
      filters: {
        age: ['young', 'senior'],
        bondedPair: true,
        breeds: [187, 1],
        clan: 1,
        color: [153],
        geoRange: 10,
        hair: ['short'],
        sex: [],
        specialNeeds: true,
        size: [1, 2],
        zipCode: '90210',
      }
    };
  }
};
</script>
```
</docs>
