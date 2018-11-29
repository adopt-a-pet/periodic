import Vue from 'vue';

Vue.config.productionTip = false;

// For the layout mixin
global.window.matchMedia = () => ({ matches: null });
