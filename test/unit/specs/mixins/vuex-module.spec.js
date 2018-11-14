import { createLocalVue, mount } from '@vue/test-utils';
import vuexModule from '@/mixins/vuex-module';
import Vuex from 'vuex';

const Vue = createLocalVue();
Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
});

const TestVuexModule = {
  state: () => ({ a: 1 }),
  actions: {
    test({ commit }, n) {
      commit('TEST', n);
    },
  },
  mutations: {
    TEST(state, n = 1) {
      state.a += n;
    },
  },
};

const TestComponent = Vue.extend({
  template: '<div></div>',
  mixins: [vuexModule],
  vuexModule: TestVuexModule,
  created() {
    this.registerVuexModule();
  },
  store,
});

describe('vuex-module', () => {
  it('should correctly namespace actions using component name', done => {
    const TestComponent1 = TestComponent.extend({
      name: 'TestComponent1',
    });

    const wrapper = mount(TestComponent1);

    expect(wrapper.vm.vuexNamespace).toBe('TestComponent1');
    expect(wrapper.vm.$mystore.a).toBe(1);

    const unsubscribe = wrapper.vm.$store.subscribeAction(action => {
      unsubscribe();

      expect(action.type).toBe('TestComponent1/test');
      expect(action.payload).toBe(5);

      done();
    });

    wrapper.vm.$dispatch('test', 5);
  });

  it('should correctly namespace mutations using component name', done => {
    const TestComponent2 = TestComponent.extend({
      name: 'TestComponent2',
    });

    const wrapper = mount(TestComponent2);

    expect(wrapper.vm.vuexNamespace).toBe('TestComponent2');
    expect(wrapper.vm.$mystore.a).toBe(1);

    const unsubscribe = wrapper.vm.$store.subscribe((mutation, state) => {
      unsubscribe();

      expect(mutation.type).toBe('TestComponent2/TEST');
      expect(mutation.payload).toBe(5);
      expect(state.TestComponent2.a).toBe(6);

      done();
    });

    wrapper.vm.$dispatch('test', 5);
  });

  it('should correctly namespace Vuex module using props', done => {
    const TestComponent2 = TestComponent.extend({
      name: 'TestComponent3',
    });

    const wrapper = mount(TestComponent2, {
      propsData: {
        vuexNamespace: 'TestComponentProps',
      },
    });

    expect(wrapper.vm.vuexNamespace).toBe('TestComponentProps');

    done();
  });
});
