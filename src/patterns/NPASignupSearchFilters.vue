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
        v-model="form.zipCode"
        type="search"
        label="Zip / Postal or City, State"
        @change="dispatchTrack({event: 'Select Location – premium alert filter', eventLabel: form.zipCode})" />

      <Dropdown
        v-model="form.geoRange"
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
        ]"
        @change="dispatchTrack({event: 'Select Distance – premium alert filter', eventLabel: form.geoRange})" />

      <DropdownMulti
        v-model="form.breeds"
        :items="breedIdsDropdown"
        label="Breeds"
        :search="true"
        multi-selected-label="Multiple"
        zero-selected-label="Any"
        size="tiny"
        type="checkbox"
        @change="dispatchTrack({event: 'Select Breed – premium alert filter', eventLabel: form.breeds})" />

      <DropdownMulti
        v-model="form.sex"
        label="Sex"
        zero-selected-label="Any"
        multi-selected-label="Multiple"
        :columns="1"
        :items="[
          { display: 'Male', value: 'm' },
          { display: 'Female', value: 'f' }
        ]"
        @change="dispatchTrack({event: 'Select Sex – premium alert filter', eventLabel: form.sex})" />

      <DropdownMulti
        v-model="form.age"
        label="Age"
        zero-selected-label="Any"
        multi-selected-label="Multiple"
        :columns="1"
        :items="[
          { display: form.clan === 1 ? 'Puppy' : 'Kitten', value: form.clan === 1 ? 'puppy' : 'kitten' },
          { display: 'Young', value: 'young' },
          { display: 'Adult', value: 'adult' },
          { display: 'Senior', value: 'senior' }
        ]"
        @change="dispatchTrack({event: 'Select Age – premium alert filter', eventLabel: form.age})" />

      <DropdownMulti
        v-if="form.clan === 1"
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
        ]"
        @change="dispatchTrack({event: 'Select Color – premium alert filter', eventLabel: form.color})" />

      <DropdownMulti
        v-if="form.clan === 2"
        v-model="form.color"
        label="Color"
        zero-selected-label="Any"
        multi-selected-label="Multiple"
        :columns="1"
        :items="[
          { display: 'Black', value: 46 },
          { display: 'Black & White or Tuxedo', value: 47 },
          { display: 'Brown or Chocolate', value: 48 },
          { display: 'Brown Tabby', value: 49 },
          { display: 'Calico or Dilute Calico', value: 50 },
          { display: 'Cream or Ivory', value: 51 },
          { display: 'Gray, Blue or Silver Tabby', value: 53 },
          { display: 'Gray or Blue', value: 52 },
          { display: 'Orange or Red', value: 54 },
          { display: 'Orange or Red Tabby', value: 55 },
          { display: 'Spotted Tabby/Leopard Spotted', value: 56 },
          { display: 'Tabby', value: 61 },
          { display: 'Tan or Fawn', value: 57 },
          { display: 'Tan or Fawn Tabby', value: 58 },
          { display: 'Tiger Striped', value: 163 },
          { display: 'Tortoiseshell', value: 59 },
          { display: 'White', value: 60 }
        ]"
        @change="dispatchTrack({event: 'Select Color – premium alert filter', eventLabel: form.color})" />

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
        ]"
        @change="dispatchTrack({event: 'Select Size – premium alert filter', eventLabel: form.size})" />

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
     * @syscall api/pets/getBreeds
     * @param {Number}
     * @returns {{breedId: Number, breedName: String}}
     * @returns {{breedId: Number, breedName: String, breedNamePlural: String}}
     */
    this.$syscall('api/pets/getBreeds', this.form.clan).then(response => {
      this.breedIdsDropdown = response.map(({ breedId, breedName }) => ({
        display: breedName,
        value: breedId,
      }));
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
      this.dispatchTrack({ event: 'Select Color – premium alert filter', eventLabel: JSON.stringify(this.form) });
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
    /**
     * Dispatch analytics track with an eventData
     */
    dispatchTrack(eventData) {
      eventData.eventLabel = eventData.eventLabel.toString();
      this.$syscall('analytics/track/dispatchTrack', eventData);
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
        clan: 1,
        color: [153],
        geoRange: 10,
        hair: ['short'],
        sex: ["f"],
        size: [1, 2],
        zipCode: "90210",
      },
    };
  }
};
</script>
```
</docs>
