/**
 * System.js creates the Design System Library.
 * It’s used in the system itself and when exporting it.
 *
 * You should & can add your own dependencies here if needed.
 */

import bemNames from '@/mixins/bem-names';
import layout from '@/mixins/layout';
import vuexModule from '@/mixins/vuex-module';
import { validationMixin } from 'vuelidate';

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

export const mixins = [bemNames, layout, validationMixin, vuexModule];

// Install the above defined components
const System = {
  install(Vue) {
    components.forEach(component => Vue.component(
      component.name,
      Vue.extend(component).extend({ mixins }),
      // Vue.extend({ mixins }).extend(component),
    ));
  },
};

// Automatic installation if Vue has been added to the global scope
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(System);
}

// Finally export as default
export default System;
