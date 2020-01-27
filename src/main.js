// Vue Design System: The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Meta from 'vue-meta';
import App from '@/App';
import router from '@/router';

// Vue Design System: Auto importing components globally
import DesignSystem from '@/system';

const tokens = require('../src/assets/tokens/tokens.json');

Vue.use(DesignSystem);
Vue.use(Meta);

Vue.config.productionTip = false;
Vue.prototype.$tokens = tokens;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
