<template>
  <form
    action=""
    @submit.prevent="searchonclick(1)">
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
      <DropdownMulti
        v-model="age"
        :items="[
          { display: 'Puppy', value: 'puppy' },
          { display: 'Young', value: 'young' },
          { display: 'Adult', value: 'adult' },
          { display: 'Senior', value: 'senior' }
        ]"
        name="Dog-Age"
        label="Age"
        zero-selected-label="Any"
        multi-selected-label="Multiple"
        class="search-module__filter-one"
        @change="ageOnChange($event)" />
      <Dropdown
        v-model="breed"
        :items="[{ display: 'Any', value: 'any' }].concat(breeds)"
        :search="true"
        label="Breed"
        tooltip="Your search will show purebreds & mixes of the breed you select as well as similar pets."
        class="search-module__filter-two home-breed-filter"
        @change="breedOnChange" />
      <Button
        class="search-module__search-button"
        @click="searchonclick(1)">
        Search
      </Button>
      <div class="image-container">
        <img
          v-show="layoutDeviceType === 'desktop' && showV2 === false"
          class="search-image"
          src="https://images-ra.adoptapet.com/images/Homepage-Dog.png"
          alt="Cute Dog">
        <img
          v-show="layoutDeviceType === 'desktop' && showV2 === true"
          class="search-image"
          src="https://images-ra.adoptapet.com/images/Homepage-DogV2.png"
          alt="Cute Dog">
        <img
          v-show="layoutDeviceType === 'mobile'"
          class="search-image"
          src="https://images-ra.adoptapet.com/images/Homepage-Dog-MOBILE.png"
          alt="Cute Dog">
      </div>
    </div>
  </form>
</template>
<script>
// import { locationValidator } from '../../../../../js/shared/validators/location-vuelidate';

export default {
  name: 'SearchFormSidebarDog',
  props: {
    updatefilters: Function,
    searchonclick: Function,
    setsessionstoragevalue: Function,
    islocationvalid: Function,
    setfieldchangedtotrue: Function,
    searchfilters: Object,
    breeds: Array,
    validationerror: Boolean,
  },
  data() {
    return {
      location: '',
      locationLabel: 'Zip / Postal or City, State',
      age: [],
      breed: 'any',
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
      this.whichDogImage();
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
      this.whichDogImage();
      if (window.matchMedia('(min-width: 978px)').matches) {
        this.layoutDeviceType = 'desktop';
      } else {
        this.layoutDeviceType = 'mobile';
      }
    },
    ageOnChange() {
      this.updatefilters('age', this.age);
      this.setfieldchangedtotrue('changedAge');
    },
    breedOnChange() {
      this.updatefilters('selectedBreeds', [this.breed]);
      const toolTip = document.getElementsByClassName('periodic-tooltip');
      if (this.breed !== 'any') {
        toolTip[0].style.display = 'none';
      } else {
        toolTip[0].style.display = 'block';
      }
      this.setfieldchangedtotrue('changedBreed');
    },
    /**
     * Either display the dog image with chopped ear
     * or show the one with full ear. Depends on whether or
     * not the image is flush against the top of the container
     * div.
     */
    whichDogImage() {
      if (
        window.matchMedia('(min-width: 978px) and (max-width: 1150px)').matches || this.validationerror
      ) {
        this.showV2 = true;
      } else {
        this.showV2 = false;
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
      this.updatefilters('zipCode', this.location);
    },
  },
};
</script>
