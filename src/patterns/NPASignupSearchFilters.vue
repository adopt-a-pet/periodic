<template>
  <div :class="b().toString()">
    <Heading
      :class="b('title').toString()"
      :level="layout === 'desktop' ? 'h1' : 'h2'"
      font-weight="bold"
      font-family="museo">
      Filters
    </Heading>

    <VSpacer size="l" />

    <div :class="b('container').toString()">
      <TextInput
        v-model="form.zipcode"
        type="search"
        label="Zip / Postal or City, State" />

      <Dropdown
        v-model="form.radius"
        label="Distance"
        :items="[
          { display: '5 miles or less', value: 5 },
          { display: '10 miles or less', value: 10 },
          { display: '20 miles or less', value: 20 },
          { display: '50 miles or less', value: 50 },
          { display: '100 miles or less', value: 100 },
          { display: '250 miles or less', value: 250 },
          { display: '500 miles or less', value: 500 },
          { display: '3500 miles or less', value: -1 }
        ]" />

      <DropdownMulti
        v-model="form.selectedBreeds"
        :items="breedIdsDropdown"
        label="Breeds"
        :search="true"
        multi-selected-label="Multiple"
        zero-selected-label="Any"
        size="tiny"
        type="checkbox" />

      <DropdownMulti
        v-model="form.sex"
        label="Sex"
        zero-selected-label="Any"
        multi-selected-label="Multiple"
        :columns="1"
        :items="[
          { display: 'Male', value: 'm' },
          { display: 'Female', value: 'f' }
        ]" />

      <DropdownMulti
        v-model="form.age"
        label="Age"
        zero-selected-label="Any"
        multi-selected-label="Multiple"
        :columns="1"
        :items="[
          { display: 'Puppy', value: 'puppy' },
          { display: 'Young', value: 'young' },
          { display: 'Adult', value: 'adult' },
          { display: 'Senior', value: 'senior' }
        ]" />

      <DropdownMulti
        v-model="form.color"
        label="Color"
        zero-selected-label="Any"
        multi-selected-label="Multiple"
        :columns="1"
        :items="[
          { display: 'Black', value: 152 },
          { display: 'Brindle', value: 153 },
          { display: 'Brown/Chocolate', value: 154 },
          { display: 'Gray/Blue/Silver', value: 155 },
          { display: 'Merle', value: 156 },
          { display: 'Red/Golden/Orange', value: 157 },
          { display: 'Silver & Tan', value: 158 },
          { display: 'Tan/Yellow/Fawn', value: 159 },
          { display: 'Tricolor', value: 160 },
          { display: 'White', value: 161 }
        ]" />

      <DropdownMulti
        v-if="form.clan === 1"
        v-model="form.size"
        label="Size"
        zero-selected-label="Any"
        multi-selected-label="Multiple"
        :columns="1"
        :items="[
          { display: 'Small', value: 1 },
          { display: 'Medium', value: 2 },
          { display: 'Large', value: 3 },
          { display: 'X-Large', value: 4 }
        ]" />

      <DropdownMulti
        v-if="form.clan === 2"
        v-model="form.hair"
        :columns="1"
        zero-selected-label="Any"
        multi-selected-label="Multiple"
        label="Hair"
        :items="[
          { display: 'Short', value: 'short' },
          { display: 'Medium', value: 'medium' },
          { display: 'Long', value: 'long' }
        ]" />
    </div>

    <Button
      :class="b('save-close').toString()"
      @click="saveAndClose">
      Save &amp; Close
    </Button>
  </div>
</template>

<script>
export default {
  name: 'NPASignupSearchFilters',
  blockName: 'npa-signup-search-filters',
  status: 'under-review',
  release: '1.0.0',

  props: {
    /**
     * Search Filters ex:
     *
     * ```
     * {
     *     age: ["young", "senior"],
     *     sex: ["f"],
     *     color: 'Black',
     *     selectedBreeds: 'Pittbull',
     *     radius: '10',
     *     zipcode: '90210',
     *     clan: 1
     *  }
     * ```
     *
     */
    filters: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      form: { ...this.filters },
      breedIdsDropdown: [],
    };
  },

  computed: {},

  created() {
    /**
     * Get Breed name and Ids from database
     *
     * @syscall api/getBreeds
     * @param {Number}
     * @returns {{breedId: Number, breedName: String}}
     */
    this.$syscall('api/getBreeds', this.form.clan)
      .then(response => {
        this.breedIdsDropdown = response.map(
          ({ breedId, breedName }) => ({
            display: breedName,
            value: breedId,
          }),
        );
      });
  },

  methods: {
    saveAndClose() {
      this.submit();
      /**
       * When user clicks "What is this"
       *
       * @event click:saveAndClose
       * @type none
       */
      this.$emit('click:saveAndClose');
    },
    submit() {
      /**
       * Change event
       *
       * @event submit
       * @type Object
       */
      this.$emit('submit', this.form);
    },
  },
};
</script>

<docs>
```vue
<template>
  <NPASignupSearchFilters
    :filters='filters' />
</template>
<script>
export default {
  data() {
    return {
      filters: {
        age: ["young", "senior"],
        sex: ["f"],
        color: [153],
        selectedBreeds: [],
        hair: ['short'],
        size: [1, 2],
        radius: 10,
        zipcode: "90210",
        clan: 1
      },
    };
  }
};
</script>
```
</docs>
