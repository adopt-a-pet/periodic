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
    'analytics/track/PaymentForm/firstName/click': function(_, payload) {
      console.log('event:', 'firstName');
    },
    'analytics/track/PaymentForm/lastName/click': function(_, payload) {
      console.log('event:', 'lastName');
    },
    'analytics/track/PaymentForm/cardNumber/click': function(_, payload) {
      console.log('event:', 'cardNumber');
    },
    'analytics/track/PaymentForm/cardExpiration/click': function(_, payload) {
      console.log('event:', 'cardExpiration');
    },
    'analytics/track/PaymentForm/cardCVC/click': function(_, payload) {
      console.log('event:', 'cardCVC');
    },
    'analytics/track/PaymentForm/zipCode/click': function(_, payload) {
      console.log('event:', 'zipCode');
    },
    'analytics/track/PaymentForm/googlePay/click': function(_, payload) {
      console.log('event:', 'googlePay');
    },
    'analytics/track/PaymentForm/applePay/click': function(_, payload) {
      console.log('event:', 'applePay');
    },
    'analytics/track/PaymentForm/creditCard/click': function(_, payload) {
      console.log('event:', 'creditCard');
    },
    'analytics/track/PaymentForm/quickPay/click': function(_, payload) {
      console.log('event:', 'quickPay');
    },
    'analytics/track/PaymentForm/applePayLoads/load': function(_, payload) {
      console.log('event:', 'applePayLoads');
    },
    'analytics/track/PaymentForm/googlePayLoads/load': function(_, payload) {
      console.log('event:', 'googlePayLoads');
    },
    'analytics/track/NPASignupSearchFilters/save/click': function(_, payload) {
      console.log('event:', 'save', payload);
    },
    'analytics/track/NPASignupSearchFilters/location/select': function(_, payload) {
      console.log('event:', 'location', payload);
    },
    'analytics/track/NPASignupSearchFilters/distance/select': function(_, payload) {
      console.log('event:', 'distance', payload);
    },
    'analytics/track/NPASignupSearchFilters/breed/select': function(_, payload) {
      console.log('event:', 'breed', payload);
    },
    'analytics/track/NPASignupSearchFilters/sex/select': function(_, payload) {
      console.log('event:', 'sex', payload);
    },
    'analytics/track/NPASignupSearchFilters/age/select': function(_, payload) {
      console.log('event:', 'age', payload);
    },
    'analytics/track/NPASignupSearchFilters/color/select': function(_, payload) {
      console.log('event:', 'color', payload);
    },
    'analytics/track/NPASignupSearchFilters/size/select': function(_, payload) {
      console.log('event:', 'size', payload);
    },
    'analytics/track/NPASignupForm/premiumAlert/click': function(_, payload) {
      console.log('event:', 'premiumAlert');
    },
    'analytics/track/NPASignupForm/freeAlert/click': function(_, payload) {
      console.log('event:', 'freeAlert');
    },
    'analytics/track/NPASignupForm/editFilters/click': function(_, payload) {
      console.log('event:', 'editFilters');
    },
    'api/validation/locationValidator': function (_, payload) {
      console.log("Hit VML and validate!");
    },
    'api/validation/emailDNCValidator': function (_, payload) {
      console.log("Hit VML and validate!");
    },
  }
};
