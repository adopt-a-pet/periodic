<template>
  <div>
    <Heading
      level="h3"
      font-weight="bold"
      :style="{ 'margin-bottom': $space_xxs }">
      Home type
    </Heading>

    <Paragraph :style="{ 'margin-bottom': $space_xxxs }">
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

    <VSpacer size="l" />

    <Heading
      level="h3"
      font-weight="bold"
      :style="{ 'margin-bottom': $space_xxs }">
      Rent or own
    </Heading>


    <Paragraph :style="{ 'margin-bottom': $space_xxxs }">
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

    <VSpacer size="l" />

    <Heading
      level="h3"
      font-weight="bold"
      :style="{ 'margin-bottom': $space_xxs }">
      Kids
    </Heading>


    <Paragraph :style="{ 'margin-bottom': $space_xxxs }">
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

    <div v-if="userProfile.hasChildren">
      <VSpacer />
      <Paragraph :style="{ 'margin-bottom': $space_xxxs }">
        How many children live in your household?
      </Paragraph>

      <Dropdown
        v-model="userProfile.numberOfChildren"
        :items="dropdownItemsFromRange(1, 6)"
        label="Number of Children"
        name="numberofchildren"
        focus-border
        @change="fieldChange('haschildren', $event)" />

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

    <VSpacer size="l" />

    <Heading
      level="h3"
      font-weight="bold"
      :style="{ 'margin-bottom': $space_xxs }">
      Current pets
    </Heading>

    <Paragraph
      :style="{ 'margin-bottom': $space_xxxs }">
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

      <Paragraph
        v-if="checkedPetTypesCount > 0">
        Choose how many of each pet
      </Paragraph>

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
  </div>
</template>

<script>
export default {
  name: 'UserSurvey',
  status: 'prototype',
  release: '1.0.0',
  blockName: 'user-survey',
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
      return this.layout === 'tablet-wide' ? 3 : 1;
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
