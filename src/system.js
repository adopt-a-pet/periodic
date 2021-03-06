/**
 * System.js creates the Design System Library.
 * It’s used in the system itself and when exporting it.
 *
 * You should & can add your own dependencies here if needed.
 */

import { validationMixin } from 'vuelidate';
import bemNames from '@/mixins/bem-names';
import dropdownItems from '@/mixins/dropdown-items';
import errorMessages from '@/mixins/error-messages';
import filters from '@/mixins/filters';
import layout from '@/mixins/layout';
import syscall from '@/mixins/syscall';
import validateRequired from '@/mixins/validate-required';

import './styles/styles.scss';

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
  validateRequired,
  validationMixin,
];

// Install the above defined components
const System = {
  install(Vue) {
    const baseComponent = Vue.extend({ mixins });

    components.forEach(component => Vue.component(
      component.name,
      baseComponent.extend(component),
    ));
  },
};

// Automatic installation if Vue has been added to the global scope
// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.use(System);
// }

// Finally export as default
export default System;
