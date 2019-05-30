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
        name="hometype"
        @change="fieldChange('hometype', $event)" />
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
        name="rentorown"
        @change="fieldChange('rentorown', $event)" />
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
        name="haschildren"
        @change="fieldChange('haschildren', $event)" />

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
          focus-border
          @change="fieldChange('haschildren', $event)" />

        <VSpacer size="l" />

        <div
          :class="b('dropdown-group').toString()">
          <Dropdown
            v-for="n in userProfile.numberOfChildren"
            :key="n"
            v-model="userProfile['ageOfChild' + n]"
            :items="dropdownItemsFromRange(1, 21)"
            :name="`ageofchild${n}`"
            :label="`Age of Child ${n}`"
            focus-border
            @change="fieldChange(`ageofchild${n}`, $event)" />
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
        name="haspets"
        @change="fieldChange('haspets', $event)" />

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
            :name="`haspets-${pet.hasPetType.toLowerCase()}`"
            @change="hasPetCheckboxChange(pet, $event)">
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

        <VSpacer size="xs" />

        <div
          :class="b('dropdown-group').toString()">
          <Dropdown
            v-for="(dropdown) in checkedPetsDropdowns"
            :key="'petcount-' + dropdown.hasPetType"
            v-model="userProfile[dropdown.prop]"
            :items="petCountDropdown"
            :label="`Number of ${dropdown.name}`"
            :name="`petcount-${dropdown.hasPetType.toLowerCase()}`"
            focus-border
            @change="fieldChange(`petcount-${dropdown.hasPetType.toLowerCase()}`, $event)" />
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
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      userProfile: Object.assign({}, this.profile),
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
         * When a field is changed, emits the whole user profile object
         *
         * @event change
         * @type Object
         */
        this.$emit('change', userProfile);
      },
    },

    'userProfile.hasChildren': function (hasChildren) {
      if (hasChildren === false) {
        // Do this so the all the ageOfChildX props get removed
        this.numberOfChildrenChange(0, this.userProfile.numberOfChildren);
        this.$delete(this.userProfile, 'numberOfChildren');
      }
    },

    'userProfile.numberOfChildren': 'numberOfChildrenChange',

    'userProfile.hasPets': function (hasPets) {
      if (hasPets === false) {
        const userProfile = Object.assign({}, this.userProfile);

        // Remove all the numberOfDogs, numberOfCats, etc.
        this.allPetsDropdowns.forEach(({ prop }) => {
          delete userProfile[prop];
        });

        // By replacing this.userProfile, it will only emit 'change' once
        this.userProfile = userProfile;

        // Because all the counts are now 0 this will uncheck all the checkboxes
        this.checkHasPetTypes();
      }
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

    fieldChange(name, value) {
      /**
       * When a field is changed, emits both the field name and new value
       *
       * @event field-change
       * @type Any
       */
      this.$emit('field-change', name, value);
    },

    hasPetCheckboxChange({ hasPetType, prop }, value) {
      if (value === false) {
        this.$delete(this.userProfile, prop);
      }

      this.fieldChange(`haspets-${hasPetType.toLowerCase()}`, value);
    },

    numberOfChildrenChange(current, before) {
      // If the number of children decreases, remove all of the ages that
      // are not shown any longer
      if (current < before) {
        const userProfile = Object.assign({}, this.userProfile);

        Array(before - current).fill().forEach((n, i) => {
          const dropdownNumber = current + i + 1;
          delete userProfile[`ageOfChild${dropdownNumber}`];
        });

        // By replacing this.userProfile, it will only emit 'change' once
        this.userProfile = userProfile;
      }
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
