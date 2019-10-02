export default {
  namespaced: true,

  actions: {
    'api/pets/getBreeds': function (_, payload) {
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
    'api/pets/getColors': function (_, payload) {
      return Promise.resolve([
        {
          colorId: 153,
          colorName: 'Brindle',
        },
      ]);
    },
    'config/stripe/key': function (_, payload) {
      return Promise.resolve (
        'pk_test_5W1GpRySJaGqo11L07q0eg1Q'
      );
    },
    'config/vml/base': function (_, payload) {
      return Promise.resolve (
        'ra-api.adoptapet.com'
      );
    },
    'analytics/track/dispatchTrack': function(_, payload) {
      console.log(payload);
    },
    'analytics/track/PaymentForm/click/firstName': function(_, payload) {
      console.log('event:', 'firstName');
    },
    'analytics/track/PaymentForm/click/lastName': function(_, payload) {
      console.log('event:', 'lastName');
    },
    'analytics/track/PaymentForm/click/cardNumber': function(_, payload) {
      console.log('event:', 'cardNumber');
    },
    'analytics/track/PaymentForm/click/cardExpiration': function(_, payload) {
      console.log('event:', 'cardExpiration');
    },
    'analytics/track/PaymentForm/click/cardCVC': function(_, payload) {
      console.log('event:', 'cardCVC');
    },
    'analytics/track/PaymentForm/click/zipCode': function(_, payload) {
      console.log('event:', 'zipCode');
    },
    'analytics/track/NPASignupSearchFilters/click/save': function(_, payload) {
      console.log('event:', 'save', payload);
    },
    'analytics/track/NPASignupSearchFilters/select/location': function(_, payload) {
      console.log('event:', 'location', payload);
    },
    'analytics/track/NPASignupSearchFilters/select/distance': function(_, payload) {
      console.log('event:', 'distance', payload);
    },
    'analytics/track/NPASignupSearchFilters/select/breed': function(_, payload) {
      console.log('event:', 'breed', payload);
    },
    'analytics/track/NPASignupSearchFilters/select/sex': function(_, payload) {
      console.log('event:', 'sex', payload);
    },
    'analytics/track/NPASignupSearchFilters/select/age': function(_, payload) {
      console.log('event:', 'age', payload);
    },
    'analytics/track/NPASignupSearchFilters/select/color': function(_, payload) {
      console.log('event:', 'color', payload);
    },
    'analytics/track/NPASignupSearchFilters/select/size': function(_, payload) {
      console.log('event:', 'size', payload);
    },
    'analytics/track/NPASignupForm/click/premiumAlert': function(_, payload) {
      console.log('event:', 'premiumAlert');
    },
    'analytics/track/NPASignupForm/click/FreeAlert': function(_, payload) {
      console.log('event:', 'freeAlert');
    },
    'analytics/track/NPASignupForm/click/editFilters': function(_, payload) {
      console.log('event:', 'editFilters');
    },
  }
};
