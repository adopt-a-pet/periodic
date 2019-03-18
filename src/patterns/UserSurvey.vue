<template>
  <!-- <Heading
    level="h3"
    font-weight="bold">Pet Care</Heading>

  <VSpacer size="s" />

  <div v-show="dogPage">
    <Paragraph>
      How many hours will your newly adopted pet be alone per day?
    </Paragraph>

    <RadioGroup
      :columns="radioColumns"
      :items="[
        { display: '0-3 hours ', value: '0-3' },
        { display: '4-6 hours', value: '4-6' },
        { display: '7-9 hours', value: '7-9' },
        { display: '9 or more hours', value: '> 9' },
      ]"
      v-model="userProfile.petHoursAlone"
      name="pethoursalone" />
  </div>

  <div v-show="catPage">
    <Paragraph>
      Declawing is a surgery to permanently amputate the last bone in each of the cat’s or
      kitten’s toes. Is this something you will consider having done to your new adopted
      cat, if [he/she] isn't declawed already?
    </Paragraph>

    <RadioGroup
      :columns="radioColumns"
      :items="[
        { display: 'Yes', value: true },
        { display: 'No', value: false },
      ]"
      v-model="userProfile.declawingCat"
      name="declawingcat" />

    <VSpacer size="s" />

    <Paragraph>
      Where will your new adopted cat be allowed?
    </Paragraph>

    <RadioGroup
      :columns="radioColumns"
      :items="[
        { display: 'Indoors only', value: 'indoors' },
        { display: 'Outdoors only', value: 'outdoors' },
        { display: 'Indoors and Outdoors', value: 'indoors and outdoors' },
        { display: 'Indoors with some outdoor access when supervised',
          value: 'indoors with outdoor supervision' },
      ]"
      v-model="userProfile.whereCatAllowed"
      name="wherecatallowed" />
  </div>

  <VSpacer size="xl" /> -->

  <div>
    <article>
      <Heading
        level="h3"
        font-weight="bold">
        Home Type
      </Heading>

      <VSpacer size="s" />

      <Paragraph>
        Which best describes your home?
      </Paragraph>

      <RadioGroup
        v-model="userProfile.homeType"
        :columns="radioColumns"
        :items="[
          { display: 'House', value: 'house' },
          { display: 'Apartment', value: 'apartment' },
          { display: 'Townhouse', value: 'townhouse' },
        ]"
        name="hometype" />
    </article>

    <VSpacer size="xl" />

    <article>
      <Heading
        level="h3"
        font-weight="bold">
        Rent or Own
      </Heading>

      <VSpacer size="s" />

      <Paragraph>
        Do you rent or own?
      </Paragraph>

      <RadioGroup
        v-model="userProfile.rentOrOwn"
        :columns="radioColumns"
        :items="[
          { display: 'Rent', value: 'rent' },
          { display: 'Own', value: 'own' }
        ]"
        name="rentorown" />
    </article>

    <VSpacer size="xl" />

    <article>
      <Heading
        level="h3"
        font-weight="bold">
        Kids
      </Heading>

      <VSpacer size="s" />

      <Paragraph>
        Are there any children living in your household?
      </Paragraph>

      <RadioGroup
        v-model="userProfile.hasChildren"
        :columns="radioColumns"
        :items="[
          { display: 'Yes', value: true },
          { display: 'No', value: false },
        ]"
        name="haschildren" />

      <div
        v-if="userProfile.hasChildren">
        <VSpacer size="s" />

        <Paragraph>
          How many children live in your household?
        </Paragraph>

        <VSpacer size="s" />

        <Dropdown
          v-model="userProfile.numberOfChildren"
          :items="dropdownItemsFromRange(1, 6)"
          label="Number of Children"
          name="numberofchildren"
          focus-border />

        <div
          v-for="n in userProfile.numberOfChildren"
          :key="n">
          <VSpacer size="s" />

          <Dropdown
            v-model="userProfile['ageOfChild' + n]"
            :items="dropdownItemsFromRange(1, 21)"
            :name="`ageofchild${n}`"
            :label="`Age of Child ${n}`"
            focus-border />
        </div>
      </div>
    </article>

    <VSpacer size="xl" />

    <article>
      <Heading
        level="h3"
        font-weight="bold">
        Current Pets
      </Heading>

      <VSpacer size="s" />

      <Paragraph>
        Do you have any other pets?
      </Paragraph>

      <RadioGroup
        v-model="userProfile.hasPets"
        :columns="radioColumns"
        :items="[
          { display: 'Yes', value: true },
          { display: 'No', value: false },
        ]"
        name="haspets" />

      <div
        v-if="userProfile.hasPets"
        class="pet-inquiry-form__adopter-question--pet-types">
        <VSpacer size="s" />

        <Paragraph>
          Choose all that apply
        </Paragraph>

        <VSpacer size="s" />

        <div :class="b('haspets-checkboxes').toString()">
          <Checkbox
            v-for="(pet) in allPetsDropdowns"
            :key="'checkbox-' + pet.hasPetType"
            v-model="hasPetTypes[pet.hasPetType]"
            class="type">
            <Paragraph :class="b('checkbox-label').toString()">
              {{ pet.name }}<Paragraph />
            </paragraph>
          </Checkbox>
        </div>

        <VSpacer size="m" />

        <Paragraph
          v-if="checkedPetTypesCount > 0">
          Choose how many of each pet
        </Paragraph>

        <div
          v-for="(dropdown) in checkedPetsDropdowns"
          :key="'dropdown-' + dropdown.hasPetType">
          <VSpacer size="s" />

          <Dropdown
            v-model="userProfile[dropdown.prop]"
            :items="petCountDropdown"
            :label="`Number of ${dropdown.name}`"
            :name="dropdown.prop.toLowerCase()"
            focus-border />
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import dropdownItems from '@/mixins/dropdown-items';

export default {
  name: 'UserSurvey',
  status: 'prototype',
  release: '1.0.0',
  blockName: 'user-survey',
  mixins: [dropdownItems],
  model: {
    prop: 'profile',
    event: 'change',
  },

  props: {
    profile: {
      type: String,
      default: () => ({}),
    },
  },

  data() {
    return {
      userProfile: this.profile,
      hasPetTypes: {
        dogs: false,
        cats: false,
        rabbits: false,
        birds: false,
        smallAnimals: false,
        horses: false,
        reptilesAmphibiansFish: false,
        farmTypeAnimals: false,
      },
    };
  },

  computed: {
    radioColumns() {
      return this.layout === 'desktop' ? 3 : 1;
    },
    checkedPetTypesCount() {
      return Object.keys(this.hasPetTypes)
        .filter(petType => this.hasPetTypes[petType])
        .length;
    },
    petCountDropdown() {
      return this.dropdownItemsFromRange(1, 4).concat([
        { display: '5 or more', value: 5 },
      ]);
    },
    checkedPetsDropdowns() {
      return this.allPetsDropdowns.filter(dropdown =>
        this.hasPetTypes[dropdown.hasPetType],
      );
    },
    allPetsDropdowns() {
      return [
        {
          name: 'Dogs',
          prop: 'numberOfDogs',
          hasPetType: 'dogs',
          agesProp: 'agesOfDogs',
          agesLabel: 'Dog',
        },
        {
          name: 'Cats',
          prop: 'numberOfCats',
          hasPetType: 'cats',
          agesProp: 'agesOfCats',
          agesLabel: 'Cat',
        },
        {
          name: 'Rabbits',
          prop: 'numberOfRabbits',
          hasPetType: 'rabbits',
          agesProp: 'agesOfRabbits',
          agesLabel: 'Rabbit',
        },
        {
          name: 'Birds',
          prop: 'numberOfBirds',
          hasPetType: 'birds',
          agesProp: 'agesOfBirds',
          agesLabel: 'Bird',
        },
        {
          name: 'Small Animals',
          prop: 'numberOfSmallAnimals',
          hasPetType: 'smallAnimals',
          agesProp: 'agesOfSmallAnimals',
          agesLabel: 'Animal',
        },
        {
          name: 'Horses',
          prop: 'numberOfHorses',
          hasPetType: 'horses',
          agesProp: 'agesOfHorses',
          agesLabel: 'Horse',
        },
        {
          name: 'Reptiles/Amphibians/Fish',
          prop: 'numberOfReptiles',
          hasPetType: 'reptilesAmphibiansFish',
          agesProp: 'agesOfReptiles',
          agesLabel: 'Animal',
        },
        {
          name: 'Farm Type Animals',
          prop: 'numberOfFarmTypeAnimals',
          hasPetType: 'farmTypeAnimals',
          agesProp: 'agesOfFarmTypeAnimals',
          agesLabel: 'Animal',
        },
      ];
    },
  },

  watch: {
    userProfile: {
      deep: true,
      handler(userProfile) {
        /**
         * Change event
         *
         * @event change
         * @type Boolean
         */
        this.$emit('change', userProfile);
      },
    },

    'userProfile.hasChildren': function (hasChildren) {
      if (hasChildren === false) {
        this.userProfile.numberOfChildren = 0;
      }
    },

    'userProfile.numberOfChildren': function (current, before) {
      // If the number of children decreases, remove all of the ages that
      // are not shown any longer
      if (current < before) {
        Array(before - current).fill().forEach((n, i) => {
          const dropdownNumber = current + i + 1;
          delete this.userProfile[`ageOfChild${dropdownNumber}`];
        });
      }
    },

    'userProfile.hasPets': function (hasPets) {
      if (hasPets === false) {
        this.userProfile.numberOfDogs = 0;
        this.userProfile.numberOfCats = 0;
        this.userProfile.numberOfRabbits = 0;
        this.userProfile.numberOfBirds = 0;
        this.userProfile.numberOfSmallAnimals = 0;
        this.userProfile.numberOfHorses = 0;
        this.userProfile.numberOfReptiles = 0;
        this.userProfile.numberOfFarmTypeAnimals = 0;

        // Because all the counts are now 0 this will uncheck all the checkboxes
        this.checkHasPetTypes();
      }
    },

    // When a new `profile` is passed to this component, update the checkboxes
    profile() {
      // Check all boxes for pets where pet count > 0
      this.checkHasPetTypes();
    },
  },

  created() {
    this.checkHasPetTypes();
  },

  methods: {
    // Change all checkboxes to checked for pets where pet count > 0
    checkHasPetTypes() {
      this.allPetsDropdowns.forEach(({ prop, hasPetType }) => {
        this.hasPetTypes[hasPetType] = (this.userProfile[prop] > 0);
      });
    },
  },
};
</script>

<docs>
```vue
<template>
  <UserSurvey v-model="survey" />
</template>
<script>
export default {
  data() {
    return {
      survey: {},
    }
  }
};
</script>
```
</docs>
