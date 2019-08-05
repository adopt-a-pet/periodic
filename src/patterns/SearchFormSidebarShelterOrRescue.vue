<template>
  <form
    action=""
    @submit.prevent="searchShelters()">
    <div
      :class="{ 'search-module--validation-error': validationerror}"
      class="dog-search search-module">
      <TextInput
        ref="locationField"
        v-model="location"
        :label="locationLabel"
        :validations="locationValidator"
        :error-messages="{
          locationValidator: 'Invalid Location',
          required: 'Invalid Location'
        }"
        required
        class="search-module__location-field"
        @focus="maybeFloatLabel(true)"
        @change="locationOnChange"
        @blur="locationOnChange" />
      <div
        v-if="validationerror"
        class="search-module__error-div">
        Enter a zip / postal or city, state (2 letter state).
      </div>
      <Dropdown
        v-model="distance"
        :items="[
          { display: '35 Miles or less', value: 5 },
          { display: '50 Miles or less', value: 50 },
          { display: '75 Miles or less', value: 75 },
          { display: '100 Miles or less', value: 100 },
          { display: '250 Miles or less', value: 250 }
        ]"
        name="Distance"
        label="Distance"
        class="search-module__filter-one search-module__distance-filter" />
      <Dropdown
        v-model="sheltersWith"
        :items="[
          { display: 'Any', value: '' },
          { display: 'Dogs', value: 'dogs' },
          { display: 'Cats', value: 'cats' },
          { display: 'Rabbits', value: 'rabbits' },
          { display: 'Small Animals', value: 'small_animals' },
          { display: 'Birds', value: 'birds' },
          { display: 'Horses', value: 'horses' },
          { display: 'Reptiles, Amphibians, And/Or Fish', value: 'reptiles' },
          { display: 'Farm Animals', value: 'farm_animals' },
        ]"
        label="Shelters With"
        class="search-module__filter-two" />
      <Button
        class="search-module__search-button"
        @click="searchShelters()">
        Search
      </Button>
      <div class="image-container-wide">
        <img
          v-if="layoutDeviceType === 'desktop'"
          class="search-image"
          src="https://images-ra.adoptapet.com/images/Homepage-ShelterRescue-New.png"
          alt="Cute Dog">
        <img
          v-if="layoutDeviceType === 'mobile'"
          class="search-image"
          src="https://images-ra.adoptapet.com/images/Homepage-ShelterRescue-Mobile.png"
          alt="Cute Dog">
      </div>
    </div>
  </form>
</template>
<script>
// import { locationValidator } from '../../../../../js/shared/validators/location-vuelidate';

export default {
  name: 'SearchFormSidebarShelterOrRescue',
  props: {
    updatefilters: Function,
    setsessionstoragevalue: Function,
    islocationvalid: Function,
    setfieldchangedtotrue: Function,
    validationerror: Boolean,
  },
  data() {
    return {
      location: '',
      locationLabel: 'Zip / Postal or City, State',
      distance: 50,
      sheltersWith: '',
      layoutDeviceType: 'mobile',
      showV2: false,
      fieldsSize: 'large',
    };
  },
  computed: {
    locationValidator() {
      return {
        // locationValidator,
      };
    },
  },
  watch: {
    validationerror() {
      this.$refs.locationField.validate();
    },
    layoutDeviceType(deviceType) {
      if (deviceType === 'mobile') {
        this.fieldsSize = 'small';
      } else {
        this.fieldsSize = 'large';
      }
    },
  },
  beforeMount() {
    this.windowResize();
  },
  mounted() {
    window.addEventListener('resize', this.windowResize);
    this.$refs.locationField.$el.focus();
  },
  methods: {
    windowResize() {
      if (window.matchMedia('(min-width: 978px)').matches) {
        this.layoutDeviceType = 'desktop';
      } else {
        this.layoutDeviceType = 'mobile';
      }
    },
    maybeFloatLabel(bool) {
      if (this.location !== '' && this.location.length > 0) {
        this.locationLabel = 'Location';
      } else {
        this.locationLabel = 'Zip / Postal or City, State';
      }
      if (bool && bool === true) {
        this.locationLabel = 'Location';
      }
    },
    locationOnChange() {
      this.islocationvalid();
      this.maybeFloatLabel();
      // this.updatefilters('zipCode', this.location);
    },
    buildQueryString() {
      const locationOrigin = window.location.origin;
      const queryString = `${locationOrigin}/animal-shelter-search?city_or_zip=${this.location}&distance=${this.distance}&adopts_out=${this.sheltersWith}`;
      return queryString;
    },
    searchShelters() {
      let isValidLocation;

      this.islocationvalid().then(response => {
        isValidLocation = response;

        if (isValidLocation === false) {
          return false;
        }

        window.location.href = this.buildQueryString();

        return true;
      });
    },
  },
};
</script>
