export default {
  namespaced: true,

  actions: {
    'api/pets/getBreeds': function (_, payload) {
      return Promise.resolve([
        {
          clanId: 1,
          breedId: 187,
          breedName: 'Affenpinscher',
          breedNamePlural: 'Affenpinschers',
        },
        {
          clanId: 1,
          breedId: 1,
          breedName: 'Afghan Hound',
          breedNamePlural: 'Afghan Hounds',
        },
        {
          clanId: 1,
          breedId: 2,
          breedName: 'Airedale Terrier',
          breedNamePlural: 'Airedale Terriers',
        },
      ]);
    },
    'api/pets/getClans': function (_, payload) {
      return Promise.resolve([
        {
          clanId: 1,
          clanName: 'dog',
          clanNamePluralPretty: 'Dogs'
        },
        {
          clanId: 2,
          clanName: 'cat',
          clanNamePluralPretty: 'Cats'
        },
        {
          clanId: 3,
          clanName: 'rabbit',
          clanNamePluralPretty: 'Rabbits'
        },
        {
          clanId: 4,
          clanName: 'small animal',
          clanNamePluralPretty: 'Small Animals'
        },
      ]);
    },
    'api/pets/getColors': function (_, payload) {
      return Promise.resolve([
        {
          colorId: 153,
          colorName: 'Brindle',
        },
      ]);
    },
    'api/pets/getSizes': function (_, payload) {
      return Promise.resolve([
        {
          clanId: 5,
          sizeId: 12,
          petSizeRangeName: 'Large',
        },
        {
          clanId: 8,
          sizeId: 20,
          petSizeRangeName: 'Small',
        },
        {
          clanId: 1,
          sizeId: 1,
          petSizeRangeName: 'Small 25 lbs or less',
        },
        {
          clanId: 1,
          sizeId: 4,
          petSizeRangeName: 'X-Large 101 lbs or more,'
        },
      ]);
    },
    'api/pets/getColors': function (_, payload) {
      return Promise.resolve([
        {
          clanId: 1,
          colorId: 152,
          colorName: 'Black',
        },
        {
          clanId: 1,
          colorId: 153,
          colorName: 'Brindle',
        },
        {
          clanId: 1,
          colorId: 154,
          colorName: 'Brown/Chocolate',
        },
      ]);
    },
    'api/pets/getAges': function (_, payload) {
      return Promise.resolve([
        {
          age: 'adult',
          clanId: 4
        },
        {
          age: 'baby',
          clanId: 4
        },
        {
          age: 'puppy',
          clanId: 1
        },
      ]);
    },
    'api/pets/getHair': function (_, payload) {
      return Promise.resolve([
        {
          clanId: 2,
          hairId: 11,
          hairName: 'short'
        },
        {
          clanId: 2,
          hairId: 1,
          hairName: 'medium'
        },
        {
          clanId: 2,
          hairId: 3,
          hairName: 'long'
        },
      ]);
    },
  },
};
