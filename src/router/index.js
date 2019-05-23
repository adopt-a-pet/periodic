import Vue from 'vue';
import Router from 'vue-router';
import Test from '@/Test';
import Periodic from '@/system';

Vue.use(Router);
Vue.use(Periodic);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Test',
      component: Test,
    },
    // {
    //   path: "*",
    //   name: "NotFound",
    //   component: NotFound,
    // },
  ],
});
