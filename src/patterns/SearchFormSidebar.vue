<template>
  <div>
    <h2 class="home__prime-title">
      Adopt the Perfect Pet
    </h2>
    <h4 class="home__prime-sub-title">
      from more than 17,000 animal shelters & rescues
    </h4>
    <div
      data-home="search-form-container"
      class="search-form-new">
      <!-- <HomeSearchHeader
        :tabonclick="tabOnClick"
        :setsessionstoragevalue="setSessionStorageValue" /> -->

      <component
        :is="whichSearch"
        :updatefilters="updateFilters"
        :searchonclick="searchOnClick"
        :islocationvalid="isLocationValid"
        :searchfilters="searchFilters"
        :validationerror="validationError"
        :breeds="breeds"
        :setsessionstoragevalue="setSessionStorageValue"
        :setdropdownmultivalue="setDropdownMultiValue"
        :setfieldchangedtotrue="setFieldChangedTotrue" />

      <div class="search-form__rehome-block">
        <h4 class="h4__heading h4--bold">
          Need to Rehome Your Pet?
        </h4>
        <p class="h6__heading h6--light  m-space-b--tiny">
          Adopt-a-Pet.com is now offering our <b>Rehome</b> program — the safe, reliable, and free
          way to find a loving new home for your pet.
        </p>
        <div
          data-link="link-new-page"
          class="h5__heading h5--bold">
          <a
            v-if="(tab === 'shelters')"
            href="https://rehome.adoptapet.com?utm_source=Search%20Module%20Test
              &utm_medium=Shelter%20Search&utm_campaign=AAP%20Mothership"
            class="page-link"
            @click="rehomeLinkGTM()">
            <span class="link-blue m-space-r--tiny">Learn More</span>
            <svg class="pl-arrow">
              <use xlink:href="#aap-icon-next" />
            </svg>
          </a>
          <a
            v-if="(tab !== 'shelters')"
            href="https://rehome.adoptapet.com?utm_source=Search%20Module%20Test
              &utm_medium=Pet%20Search&utm_campaign=AAP%20Mothership"
            class="page-link"
            @click="rehomeLinkGTM()">
            <span class="link-blue m-space-r--tiny">Learn More</span>
            <svg class="pl-arrow">
              <use xlink:href="#aap-icon-next" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapActions, mapState } from 'vuex';
// import HomeSearchHeader from './searchform/HomeSearch/HomeSearchHeader.vue';
// import DogSearch from './searchform/HomeSearch/DogSearch.vue';
// import CatSearch from './searchform/HomeSearch/CatSearch.vue';
// import ShelterOrRescueSearch from './searchform/HomeSearch/ShelterOrRescueSearch.vue';
// import { locationValidator } from '../../../js/shared/validators/location-vuelidate';

export default {
  name: 'SearchFormSidebar',
  components: {
    // HomeSearchHeader,
    // DogSearch,
    // CatSearch,
    // ShelterOrRescueSearch
  },
  // props: {
  //   evenBus: Object
  // },
  data() {
    return {
      tabClanName: 'dogs',
      validationError: false,
      changedAge: false,
      changedBreed: false,
      changedSex: false,
      gaSearchLabel: ['city_or_zip'],
      age: '',
      selectedBreeds: '',
      sex: '',
      zipCode: '',
    };
  },
  computed: {
    // ...mapState({
    //   searchFilters: state => state.pets.searchFilters,
    //   pets: state => state.pets.pets,
    //   petsCount: state => state.pets.petsCount,
    //   petsCountTotal: state => state.pets.petsCountTotal,
    //   availableBreeds: state => state.pets.availableBreeds,
    //   breeds: state => state.breeds.breedsList,
    // }),
    whichSearch() {
      switch (this.tabClanName) {
        case 'dogs':
          return 'DogSearch';
        case 'cats':
          return 'CatSearch';
        case 'shelters':
          return 'ShelterOrRescueSearch';
        default:
          return 'DogSearch';
      }
    },
  },
  watch: {
    /**
     * If user switches search modules remove
     * validation error messages.
     */
    whichSearch() {
      this.validationError = false;
    },
    changedAge(changed) {
      if (changed === true) {
        if (this.gaSearchLabel.includes('age') === false) {
          const arrayCopy = ['age', ...this.gaSearchLabel];
          this.gaSearchLabel = arrayCopy;
        }
      }
    },
    changedBreed(changed) {
      if (changed === true) {
        if (this.gaSearchLabel.includes('breed') === false) {
          const arrayCopy = ['breed', ...this.gaSearchLabel];
          this.gaSearchLabel = arrayCopy;
        }
      }
    },
    changedSex(changed) {
      if (changed === true) {
        if (this.gaSearchLabel.includes('sex') === false) {
          const arrayCopy = ['sex', ...this.gaSearchLabel];
          this.gaSearchLabel = arrayCopy;
        }
      }
    },
    tabClanName() {
      this.clearGAEvents();
      this.selectedBreeds = '';
    },
  },
  mounted() {
    this.clearFilters();
    this.$store.dispatch('breeds/getBreeds');
    sessionStorage.setItem('onPDP', 'false');
    sessionStorage.setItem('fromHome', 'true');
    this.setClanNameFromUrl();
  },
  methods: {
    // ...mapActions({
    //   runSearch: 'pets/runSearch',
    //   updateLoadingSpinner: 'pets/updateLoadingSpinner',
    //   clearFilters: 'pets/clearFilters',
    // }),
    maybeShowModule(clanName) {
      this.tabClanName = clanName;
    },
    tabOnClick(clanName) {
      const tabsObj = {
        dogs: document.getElementById('dog-link'),
        cats: document.getElementById('cat-link'),
        shelters: document.getElementById('shelter-link'),
        others: document.getElementById('others-link'),
      };

      Object.keys(tabsObj).forEach(prop => tabsObj[prop].classList.remove('active'));

      tabsObj[clanName].classList.add('active');

      /**
       * emit tabChange so that featured pets shows the
       * correct type of animals
       */
      if (clanName === 'others') {
        this.evenBus.$emit('tabChange', 'other');
      } else {
        this.evenBus.$emit('tabChange', clanName);
      }

      this.clearFilters();
      this.maybeShowModule(clanName);
    },
    searchOnClick(clan) {
      this.updateFilters('clan', clan);
      let isValidLocation;

      this.isLocationValid().then(response => {
        isValidLocation = response;

        if (isValidLocation === false) {
          return false;
        }

        this.whichGAEvents();
        this.setKlaviyoData();
        return this.$store.dispatch('pets/serializeFiltersToQuery')
          .then(query => this.$router.push({ path: '/pet-search', query }));
      });
    },
    whichGAEvents() {
      const searchButtonLabel = this.gaSearchLabel.join(', ');
      let eventAction;
      /**
       * set event action and always fire
       * the search button event
       */
      if (this.tabClanName === 'dog') {
        eventAction = 'search_dogs - new';
        this.sendGAEvents('search_dogsSearch Button - new', searchButtonLabel);
        if (this.changedBreed === true) {
          this.sendGAEvents(eventAction, 'breed');
        }
      } else {
        eventAction = 'search_cats - new';
        this.sendGAEvents('search_catsSearch Button - new', searchButtonLabel);
        if (this.changedSex === true) {
          this.sendGAEvents(eventAction, 'sex');
        }
      }
      if (this.changedAge === true) {
        this.sendGAEvents(eventAction, 'age');
      }
      // always fire location
      this.sendGAEvents(eventAction, 'city_or_zip');
    },
    updateFilters(type, value) {
      const values = [type, value];
      this[type] = value;
      this.$store.dispatch('pets/setFilterQuiet', values);
    },
    isLocationValid() {
      // const locationField = document.getElementsByClassName('search-module__location-field');
      // const locationValue = locationField[0].firstChild.value;

      // return locationValidator(locationValue).then(response => {
      //   this.validationError = !response;
      //   return response;
      // });
      return true;
    },
    setSessionStorageValue(item, value) {
      switch (item) {
        case 'clan':
          sessionStorage.setItem('petClan', value);
          break;
        case 'location':
          sessionStorage.setItem('searchLocation', value);
          break;
        case 'age':
          sessionStorage.setItem('petAge', value);
          break;
        case 'sex':
          sessionStorage.setItem('petSex', value);
          break;
        case 'breed':
          sessionStorage.setItem('petBreed', value);
          break;
        default:
          break;
      }
      sessionStorage.setItem('isPetDetails', 'true');
    },
    sendGAEvents(eventAction, eventLabel) {
      const test = `${eventAction} ${eventLabel}`; // this is just to temporarily pass eslint
      return test;
      // const gaData = {
      //   event: 'eventTracker',
      //   eventCat: 'Find a Pet',
      //   eventAct: eventAction,
      //   eventLbl: eventLabel,
      // };
      // dataLayer.push(gaData);
    },
    setFieldChangedTotrue(field) {
      this[field] = true;
    },
    setKlaviyoData() {
      const klaviyoData = {
        age: this.age,
        city_or_zip: this.zipCode,
      };
      if (this.tabClanName === 'dog') {
        klaviyoData.breed = this.selectedBreeds;
      } else {
        klaviyoData.sex = this.sex;
      }
      this.sendKlaviyoSearchData(klaviyoData);
    },
    sendKlaviyoSearchData(klaviyoData) {
      this.$store.dispatch('Analytics/track', { event: 'New Searched', searchParams: klaviyoData });
    },
    clearGAEvents() {
      this.changedAge = false;
      this.changedBreed = false;
      this.changedSex = false;
      this.gaSearchLabel = ['city_or_zip'];
    },
    setClanNameFromUrl() {
      const urlPathName = window.location.pathname;
      if (urlPathName === '/cat-adoption') {
        this.tabClanName = 'cats';
        this.tabOnClick('cats');
      }
      if (urlPathName === '/dog-adoption') {
        this.tabClanName = 'dogs';
        this.tabOnClick('dogs');
      }
      if (urlPathName === '/other-pet-adoption') {
        // this.tabClanName = 'others';
      }
      if (urlPathName === '/animal-shelters') {
        this.tabClanName = 'shelters';
        this.tabOnClick('shelters');
      }
    },
  },
};
</script>

<docs>
```vue
<template>
  <SearchForm />
</template>
<script>
export default {
  data() {
    // tab: 'dogs',
    // advanced: false,
    // nativeDropdowns: false
  }
};
</script>
```
</docs>
