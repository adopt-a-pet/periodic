<template src="./PetCard.html" />
<script>
export default {
  name: 'PetCard',
  blockName: 'pet-card',
  status: 'under-review',
  release: '1.0.0',
  props: {
    /**
     * A pet object
     */
    pet: {
      required: true,
      type: Object,
    },

    /**
     * Whether or not to include the pet's location
     */
    location: {
      type: Boolean,
      default: true,
    },

    /**
     * Whether or not to include the pet's breeds
     */
    breeds: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      a: 1,
    };
  },
  computed: {
    /**
     * Format pet properties
     */
    petFormatted() {
      const petFormatted = this.pet;
      petFormatted.age = this.$options.filters.capitalize(petFormatted.age);
      petFormatted.sex = this.pet.sex === 'm' ? 'Male' : 'Female';
      return petFormatted;
    },
  },
};
</script>

<docs>
  ```vue
  <template>
    <div class="grid" style="display: grid; grid-template-columns: 23% 23% 23% 23%; grid-gap: 24px 24px;">
      <PetCard v-for="pet of pets" :pet="pet" :breeds="true" :location="false" />
    </div>
  </template>
  <script>
    export default {
      data() {
        return {
          pets: [
            {
              "petId": 26525264,
              "name": "Some Cat",
              "sex": "f",
              "age": "kitten",
              "breedId": 1127,
              "secondaryBreedId": 1129,
              "purebred": false,
              "clanId": 2,
              "image": null,
              "media": {
                "images": null
              },
              "bondedTo": 123,
              "specialNeeds": false,
              "description": null,
              "status": "available",
              "city": "Spanish Fork",
              "state": "UT",
              "actQuickly": false,
              "breedName": "Domestic Longhair",
              "secondaryBreedName": "Domestic Shorthair"
            },
            {
              "petId": 26525265,
              "name": "Some Dog",
              "sex": "m",
              "age": "adult",
              "breedId": 20,
              "secondaryBreedId": 63,
              "purebred": false,
              "clanId": 1,
              "image": null,
              "media": {
                "images": null
              },
              "bondedTo": 0,
              "specialNeeds": true,
              "description": null,
              "status": "available",
              "city": "Spanish Fork",
              "state": "UT",
              "actQuickly": false,
              "breedName": "Bloodhound",
              "secondaryBreedName": "Great Pyrenees"
            },
            {
              "petId": 26525266,
              "name": "Some Rabbit",
              "sex": "f",
              "age": "adult",
              "breedId": 20,
              "secondaryBreedId": 63,
              "purebred": false,
              "clanId": 3,
              "image": null,
              "media": {
                "images": null
              },
              "bondedTo": 0,
              "specialNeeds": false,
              "description": null,
              "status": "available",
              "city": "Spanish Fork",
              "state": "UT",
              "actQuickly": false,
              "breedName": "Bloodhound",
              "secondaryBreedName": "Great Pyrenees"
            },
            {
              "petId": 26508809,
              "name": "59625 Kirby",
              "sex": "m",
              "age": "kitten",
              "breedId": 1127,
              "secondaryBreedId": 1129,
              "purebred": false,
              "clanId": 2,
              "image": "https://pet-uploads.adoptapet.com/4/d/b/436590983.jpeg",
              "media": {
                "images": [
                  {
                    "url": "https://pet-uploads.adoptapet.com/4/d/b/436590983.jpeg",
                    "height": 250,
                    "width": 250,
                    "tag": "h"
                  },
                  {
                    "url": "https://pet-uploads.adoptapet.com/7/2/4/436590961.jpeg",
                    "height": 200,
                    "width": 200,
                    "tag": "b"
                  }
                ]
              },
              "bondedTo": 0,
              "specialNeeds": false,
              "description": null,
              "status": "adopted",
              "city": "Spanish Fork",
              "state": "UT",
              "actQuickly": false,
              "breedName": "Domestic Longhair",
              "secondaryBreedName": "Domestic Shorthair"
            },
          ],
        };
      }
    }
  </script>
  ```
</docs>
