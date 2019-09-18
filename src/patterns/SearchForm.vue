<template>
  <div :class="b().toString()">
    <Heading level="h3">
      Find a Pet to Adopt
    </Heading>
    <nav>
      <a
        v-for="(section, index) of sections"
        :key="section"
        @click="activeSectionIndex = index">{{ section }}
        <div
          :class="{ active: activeSectionIndex === index }"
          class="underline" />
      </a>
    </nav>
    <section v-if="sections[activeSectionIndex] === 'Dogs'">
      <TextInput
        v-model="fields.zipcode"
        label="Zip / Postal or City, State" />
      <Dropdown
        v-model="fields.distance"
        :items="distances"
        label="Distance" />
      <Dropdown
        v-model="fields.breedId"
        :items="breeds"
        :search="true"
        :special-choices="[{ display: 'Any', value: null }]"
        label="Breed" />
      <Dropdown
        v-model="fields.sex"
        :items="sexes"
        :special-choices="[{ display: 'Any', value: null }]"
        label="Sex" />
      <Dropdown
        v-model="fields.size"
        :items="sizes"
        :special-choices="[{ display: 'Any', value: null }]"
        label="Size" />
      <Dropdown
        v-model="fields.color"
        :items="colors"
        :special-choices="[{ display: 'Any', value: null }]"
        label="Color" />
      <Dropdown
        v-model="fields.age"
        :items="ages"
        :special-choices="[{ display: 'Any', value: null }]"
        label="Age" />
    </section>
    <section v-if="sections[activeSectionIndex] === 'Cats'">
      <TextInput
        v-model="fields.zipcode"
        label="Zip / Postal or City, State" />
      <Dropdown
        v-model="fields.distance"
        :items="distances"
        label="Distance" />
      <Dropdown
        v-model="fields.breedId"
        :items="breeds"
        :search="true"
        :special-choices="[{ display: 'Any', value: null }]"
        label="Breed" />
      <Dropdown
        v-model="fields.sex"
        :items="sexes"
        :special-choices="[{ display: 'Any', value: null }]"
        label="Sex" />
      <Dropdown
        v-model="fields.size"
        :items="sizes"
        :special-choices="[{ display: 'Any', value: null }]"
        label="Size" />
      <Dropdown
        v-model="fields.hair"
        :items="hairs"
        :special-choices="[{ display: 'Any', value: '' }]"
        label="Hair" />
      <Dropdown
        v-model="fields.age"
        :items="ages"
        :special-choices="[{ display: 'Any', value: null }]"
        label="Age" />
    </section>
    <section v-if="sections[activeSectionIndex] === 'Others'">
      <Dropdown
        v-model="fields.clanId"
        :items="clans"
        :special-choices="[{ display: 'Any', value: null }]"
        label="Others" />
    </section>
  </div>
</template>

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
      activeSectionIndex: 0,
      ages: [],
      allAges: [],
      allColors: [],
      allBreeds: [],
      allClans: [],
      allHairs: [],
      allSizes: [],
      breeds: [],
      clans: [],
      colors: [],
      distances,
      fields: {
        distance: distances[0].value,
      },
      hairs: [],
      sections: [
        'Dogs',
        'Cats',
        'Others',
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
      sizes: [],
    };
  },
  methods: {
    /**
     * Get API data
     */
    getData() {
      this.$syscall('api/pets/getClans')
        .then(response => {
          this.allClans = response;
          this.formatList('clan', null, 'Select Pet Type');

          // create array of clan ID's
          const clanIds = [];
          response.forEach(clan => {
            clanIds.push(clan.clanId);
          });

          // get breeds
          this.$syscall('api/pets/getBreeds', clanIds)
            .then(res => {
              this.allBreeds = res;
              this.filterList('breed');
              this.formatList('breed');
            });

          // get sizes
          this.$syscall('api/pets/getSizes', clanIds)
            .then(res => {
              this.allSizes = res;
              this.filterList('size');
              this.formatList('size', 'petSizeRangeName');
            });

          // get colors
          this.$syscall('api/pets/getColors', clanIds)
            .then(res => {
              this.allColors = res;
              this.filterList('color');
              this.formatList('color');
            });

          // get ages
          this.$syscall('api/pets/getAges', clanIds)
            .then(res => {
              this.allAges = res;
              this.filterList('age');
              this.formatList('age', 'age');
            });

          // get hair
          this.$syscall('api/pets/getHair', clanIds)
            .then(res => {
              this.allHairs = res;
              this.filterList('hair');
              this.formatList('hair');
            });
        });
    },

    /**
     * Filter and format lists
     */
    filterList(listName) {
      if (this[`all${this.$options.filters.capitalize(listName)}s`].length) {
        let clanId;
        if (this.activeSection === 'Dogs') {
          clanId = 1;
        } else if (this.activeSection === 'Cats') {
          clanId = 2;
        } else if (this.clan) {
          clanId = this.clan.clanId;
        }
        this[`${listName}s`] = this[`all${this.$options.filters.capitalize(listName)}s`].filter(listItem => listItem.clanId === clanId);
      }
    },

    /**
     * Format list
     */
    formatList(listName, nameKey) {
      const nameKey2 = nameKey || `${listName}Name`;
      let value;
      const formattedList = [];

      this[`all${this.$options.filters.capitalize(listName)}s`].forEach(listItem => {
        value = listItem[`${listName}Id`] ? listItem[`${listName}Id`] : listItem[nameKey2];
        formattedList.push({
          display: this.$options.filters.capitalize(listItem[nameKey2]),
          value,
        });
      });
      this[`${listName}s`] = formattedList;
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
