/**
 * This is Vue Design System’s JS helper file for docs.
 * You can add more things if/when needed.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import WebFontLoader from '../src/utils/webFontLoader'; // eslint-disable-line no-unused-vars
import statusLabels from './utils/statusLabels';
import activeNav from './utils/activeNav';
import filterSearch from './utils/filterSearch';
import 'codemirror/mode/jsx/jsx';
import { mixins } from '../src/system';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.mixin(statusLabels);

// We have to add these mixins manually instead of an easy Vue.use(Periodic)
// because all of the components added will get overwritten by vue-styleguidist.
mixins.forEach(mixin => Vue.mixin(mixin));

document.addEventListener('DOMContentLoaded', () => {
  filterSearch.methods.init();
  activeNav.methods.init();
});

window.addEventListener('hashchange', () => {
  filterSearch.methods.init();
  activeNav.methods.init();
});
