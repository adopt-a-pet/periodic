<template>
  <form
    action=""
    @submit.prevent="searchonclick(2)">
    <div
      :class="{ 'search-module--validation-error': validationerror}"
      class="cat-search search-module">
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
          { display: 'Kitten', value: 'kitten' },
          { display: 'Young', value: 'young' },
          { display: 'Adult', value: 'adult' },
          { display: 'Senior', value: 'senior' }
        ]"
        name="Cat-Age"
        label="Age"
        zero-selected-label="Any"
        multi-selected-label="Multiple"
        class="search-module__filter-one"
        @blur="setsessionstoragevalue('age', age.toString())"
        @change="multiOnChange($event, 'age')" />
      <DropdownMulti
        v-model="sex"
        :items="[
          { display: 'Female', value: 'f' },
          { display: 'Male', value: 'm' }
        ]"
        label="Sex"
        zero-selected-label="Any"
        multi-selected-label="Multiple"
        class="search-module__filter-two"
        @change="multiOnChange($event, 'sex')" />
      <Button
        class="search-module__search-button"
        @click="searchonclick(2)">
        Search
      </Button>
      <div class="image-container cat-image-container">
        <img
          v-if="layoutDeviceType === 'desktop'"
          class="search-image"
          src="https://images-ra.adoptapet.com/images/Homepage-Cat.png"
          alt="Cute Cat">
        <img
          v-if="layoutDeviceType === 'mobile'"
          class="search-image"
          src="https://images-ra.adoptapet.com/images/Homepage-Cat-MOBILE.png"
          alt="Cute Cat">
      </div>
    </div>
  </form>
</template>
<script>
// import { locationValidator } from '../../../../../js/shared/validators/location-vuelidate';
// import layoutMixin from '../../../../../js/shared/mixins/layout';

export default {
  name: 'SearchFormSidebarCat',
  mixins: [
    // layoutMixin
  ],
  props: {
    updatefilters: Function,
    searchonclick: Function,
    setsessionstoragevalue: Function,
    islocationvalid: Function,
    setfieldchangedtotrue: Function,
    searchfilters: Object,
    validationerror: Boolean,
  },
  data() {
    return {
      location: '',
      locationLabel: 'Zip / Postal or City, State',
      age: [],
      sex: [],
      layoutDeviceType: 'mobile',
    };
  },
  computed: {
    locationValidator() {
      return {
        // locationValidator,
      };
    },
    fieldsSize() {
      if (this.layoutDeviceType === 'mobile') {
        return 'small';
      }
      return 'large';
    },
  },
  watch: {
    validationerror() {
      this.$refs.locationField.validate();
    },
  },
  beforeMount() {
    this.windowResize();
  },
  mounted() {
    window.addEventListener('resize', this.windowResize);
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
      this.updatefilters('zipCode', this.location);
    },
    multiOnChange(event, field) {
      if (field === 'age') {
        this.updatefilters(field, this.age);
        this.setfieldchangedtotrue('changedAge');
      } else {
        this.updatefilters(field, this.sex);
        this.setfieldchangedtotrue('changedSex');
      }
    },
  },
};
</script>
