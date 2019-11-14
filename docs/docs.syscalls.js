import axios from 'axios';

axios.defaults.baseURL = 'https://staging-api-ra.adoptapet.com/v1/';

export default {
  namespaced: true,

  state() {
    return {
      session: {
        user: 'Steve',
      },
    };
  },

  actions: {
    'api/location/validate': function (_, zipCode) {
      return axios.get(`utilities/locations?zipCode=${zipCode}`).then(res => (res.data.body.status));
    },
    'api/pets/getBreeds': function (_, breedIds) {
      return axios.get(`pet-utilities/${breedIds}/breeds`).then(res => (res.data.body));
    },
    'api/pets/getClans': function () {
      return axios.get('pet-utilities/clans').then(res => (res.data.body));
    },
    'api/pets/getColors': function (_, clanId) {
      return axios.get(`pet-utilities/${clanId}/colors`).then(res => (res.data.body));
    },
    'api/pets/getSizes': function (_, clanId) {
      return axios.get(`pet-utilities/${clanId}/sizes`).then(res => (res.data.body));
    },
    'api/pets/getAges': function () {
      return axios.get('pet-utilities/ages').then(res => (res.data.body));
    },
    'api/pets/getHair': function (_, clanId) {
      return axios.get(`pet-utilities/${clanId}/hair`).then(res => (res.data.body));
    },

    /**
     * Login with Guard Dog. Takes a service name.
     */
    async socialLogin({ dispatch }, { service }) {
      return this.$guardcat.oauthOpen(service)
        .then(() => dispatch('loadUserFromSession'));
    },

    /**
     * Login with email, password.
     */
    async credsLogin({ dispatch }, { email, password }) {
      return axios.post('auth/login', { email, password })
        .then(({ body: { sessionId } }) => this.$guardcat.setCookie(sessionId))
        .then(() => dispatch('loadUserFromSession'));
    },

    /**
     * Log out
     */
    async logout({ commit }) {
      this.$guardcat.logout()
        .then(() => commit('data', { user: null }));
    },
  },
};
