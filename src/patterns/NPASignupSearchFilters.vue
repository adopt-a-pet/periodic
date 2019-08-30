<template>
  <div :class="b('').toString()">
    <Heading
      :level="layout === 'desktop' ? 'h1' : 'h2'"
      font-weight="bold"
      font-family="museo">
      Filters
    </Heading>
    <Dropdown
      v-model="model"
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
      v-model="model"
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
      v-model="model"
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
      v-model="model"
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
      v-model="model"
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

  props: {},

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
    this.$syscall('api/getBreeds', this.params.clanID)
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
  <NPASignupSearchFilters/>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
```
</docs>
