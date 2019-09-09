export default {
  namespaced: true,

  actions: {
    'api/getBreeds': function (_, payload) {
      return Promise.resolve([
        {
          breedId: 187,
          breedName: 'Affenpinscher',
          breedNamePlural: 'Affenpinschers',
        },
        {
          breedId: 1,
          breedName: 'Afghan Hound',
          breedNamePlural: 'Afghan Hounds',
        },
        {
          breedId: 2,
          breedName: 'Airedale Terrier',
          breedNamePlural: 'Airedale Terriers',
        },
      ]);
    },
    'api/getColors': function (_, payload) {
      return Promise.resolve (
        [
          {
            "colorId": 153,
            "colorName": "Brindle"
          },
        ]
      );
    },
    'stripe/key': function (_, payload) {
      return Promise.resolve (
        'pk_test_5W1GpRySJaGqo11L07q0eg1Q'
      );
    }
  }
};
