<template>
  <div>
    <Heading level="h3">
      Find a Pet to Adopt
    </Heading>
    <nav>
      <a
        v-for="section of sections"
        :key="section"
        @click="activeSection = section">{{ section }}</a>
    </nav>
    <section v-if="activeSection === 'Dogs'">
      <TextInput
        v-model="fields.zipcode"
        label="Zip / Postal or City, State" />
      {{ fields.zipcode }}
    </section>
    <section v-if="activeSection === 'Cats'">
      Cats
    </section>
    <section v-if="activeSection === 'Others'">
      Others
    </section>
    <Dropdown
      v-model="fields.distance"
      :items="distances"
      label="Distance" />
    <Dropdown
      v-model="fields.search"
      :items="distances"
      :search="true"
      label="Breed" />
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  status: 'under-review',
  release: '1.0.0',
  data() {
    // get breeds
    let breeds;
    this.$syscall('getBreeds')
      .then(response => {
        breeds = response;
      });
    return {
      activeSection: 'Dogs',
      breeds,
      distances: [
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
      ],
      fields: {
        distance: this.distances[0].value,
      },
      sections: [
        'Dogs',
        'Cats',
        'Others',
      ],
    };
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
