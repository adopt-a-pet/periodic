<template>
  <div :class="b('').toString()">
    <VSpacer size="l" />

    <Heading
      :level="layout === 'desktop' ? 'h1' : 'h2'"
      font-weight="bold"
      font-family="museo">
      Filters
    </Heading>

    <VSpacer size="l" />

    <TextInput
      v-model="zipCode"
      type="search"
      label="Zip / Postal or City, State" />

    <VSpacer size="s" />

    <Dropdown
      v-model="radius"
      :items="[
        { display: '5 miles or less', value: '5' },
        { display: '10 miles or less', value: '10' },
        { display: '20 miles or less', value: '20' },
        { display: '50 miles or less', value: '50' },
        { display: '100 miles or less', value: '100' },
        { display: '250 miles or less', value: '250' },
        { display: '500 miles or less', value: '500' },
        { display: '3500 miles or less', value: -1 }
      ]"
      label="Distance" />

    <VSpacer size="s" />

    <DropdownMulti
      v-model="selectedBreed"
      :items="breedIdsDropdown"
      label="Breeds"
      :search="true"
      multi-selected-label="Multiple"
      zero-selected-label="Any"
      size="tiny"
      type="checkbox" />

    <VSpacer size="s" />

    <DropdownMulti
      v-model="sex"
      label="Sex"
      zero-selected-label="Any"
      multi-selected-label="Multiple"
      :columns="1"
      :items="[
        { display: 'Male', value: 'm' },
        { display: 'Female', value: 'f' }
      ]" />

    <VSpacer size="s" />

    <DropdownMulti
      v-model="age"
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

    <VSpacer size="s" />

    <DropdownMulti
      v-model="color"
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

    <VSpacer size="s" />

    <DropdownMulti
      v-if="clanID === 1"
      v-model="size"
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
      v-if="clanID === 2"
      v-mode="hair"
      :columns="1"
      zero-selected-label="Any"
      multi-selected-label="Multiple"
      label="Hair"
      :items="[
        { display: 'Short', value: 'short' },
        { display: 'Medium', value: 'medium' },
        { display: 'Long', value: 'long' }
      ]" />

    <VSpacer size="l" />

    <Button>Save &amp; Close</Button>

    <VSpacer size="s" />
  </div>
</template>

<script>
/**
 * NPA "What is this"
 */

export default {
  name: 'NPASignupSearchFilters',
  blockName: 'npa-signup-search-filters',
  status: 'under-review',
  release: '1.0.0',

  props: {
    /**
     * Cland ID ex: 1, 2.
     */
    clanID: {
      type: Number,
      default: 1,
    },
    /**
     * The Breed or Breeds selected from the dropdown.
     */
    selectedBreed: {
      type: Array,
      default: () => [],
    },
    /**
     * The radius selected from the dropdown.
     */
    radius: {
      type: Number,
      default: 10,
    },
    /**
     * The sex or sexes selected from the dropdown.
     */
    sex: {
      type: Array,
      default: () => [],
    },
    /**
     * The age or ages selected from the dropdown.
     */
    age: {
      type: Array,
      default: () => [],
    },
    /**
     * The color or colors selected from the dropdown.
     */
    color: {
      type: Array,
      default: () => [],
    },
    /**
     * The size or sizes selected from the dropdown.
     */
    size: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      email: '',
      dontShow: false,
      breedIdsDropdown: [],
    };
  },

  computed: {},

  mounted() {
    /**
     * Get Breed name and Ids from database
     *
     * @syscall api/getBreeds
     * @param {Number}
     * @returns {{breedId: Number, breedName: String}}
     */
    this.$syscall('api/getBreeds', this.clanID)
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
  },
};
</script>

<docs>
```vue
<template>
  <NPASignupSearchFilters
    :clanID='clanID' />
</template>
<script>
export default {
  data() {
    return {
      clanID: 1,
    };
  }
};
</script>
```
</docs>
