export default {
  namespaced: true,

  actions: {
    'api/getBreeds': function (_, payload) {
      return Promise.resolve (
        [
          {
            "breedId": 187,
            "breedName": "Affenpinscher"
          },
        ]
      );
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
    }
  }
};
