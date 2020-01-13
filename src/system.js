/**
 * System.js creates the Design System Library.
 * It’s used in the system itself and when exporting it.
 *
 * You should & can add your own dependencies here if needed.
 */

import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import VueScrollTo from 'vue-scrollto';
import bemNames from '@/mixins/bem-names';
import dropdownItems from '@/mixins/dropdown-items';
import errorMessages from '@/mixins/error-messages';
import filters from '@/mixins/filters';
import layout from '@/mixins/layout';
import syscall from '@/mixins/syscall';
import validateAsync from '@/mixins/validate-async';
import validateRequired from '@/mixins/validate-required';

import './styles/styles.scss';

// require tokens
const tokens = require('../src/assets/tokens/tokens.json');

// Define contexts to require
const contexts = [
  require.context('@/elements/', true, /\.vue$/),
  require.context('@/patterns/', true, /\.vue$/),
  require.context('@/templates/', true, /\.vue$/),
];

// Define components
const components = [];
contexts.forEach(context => {
  context.keys().forEach(key => components.push(context(key).default));
});

export const mixins = [
  bemNames,
  dropdownItems,
  errorMessages,
  filters,
  layout,
  syscall,
  validateAsync,
  validateRequired,
  validationMixin,
];

// Install the above defined components
const System = {
  install(vue) {
    const baseComponent = vue.extend({ mixins });

    components.forEach(component => vue.component(
      component.name,
      baseComponent.extend(component),
    ));
  },
};

Vue.use(VueScrollTo, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true,
});

Object.keys(tokens).forEach(key => {
  Vue.prototype[`$${key}`] = tokens[key];
});

// Automatic installation if Vue has been added to the global scope
// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.use(System);
// }

// Finally export as default
export default System;
