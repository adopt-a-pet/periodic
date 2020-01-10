import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);
Vue.use(Vuex);

const TestComponent = Vue.extend({
  template: '<NPASignupForm />',
});

describe('patterns/InfoBox', () => {
  // let store;
  //
  // beforeEach(() => {
  //   store = new Vuex.Store();
  // });


  it('reveals payment information upon clicking "Premium Alert"', () => {
    const wrapper = mount(TestComponent, { Vue });
    wrapper.find('#periodic-radio-box-npa-plan-selection-item-1-parent').trigger('click');
    // setTimeout(() => {
    //   expect(wrapper.text()).toContain('Amount (Billed Monthly)');
    //   done();
    // }, 500);
  });
});


// import { shallowMount, createLocalVue } from '@vue/test-utils'
// import Actions from '../../../src/components/Actions'
//
// const localVue = createLocalVue()
//
// localVue.use(Vuex)
//
// describe('Actions.vue', () => {
//   let actions
//   let store
//
//   beforeEach(() => {
//     actions = {
//       actionClick: jest.fn(),
//       actionInput: jest.fn()
//     }
//     store = new Vuex.Store({
//       actions
//     })
//   })
//
//   it('dispatches "actionInput" when input event value is "input"', () => {
//     const wrapper = shallowMount(Actions, { store, localVue })
//     const input = wrapper.find('input')
//     input.element.value = 'input'
//     input.trigger('input')
//     expect(actions.actionInput).toHaveBeenCalled()
//   })
//
//   it('does not dispatch "actionInput" when event value is not "input"', () => {
//     const wrapper = shallowMount(Actions, { store, localVue })
//     const input = wrapper.find('input')
//     input.element.value = 'not input'
//     input.trigger('input')
//     expect(actions.actionInput).not.toHaveBeenCalled()
//   })
//
//   it('calls store action "actionClick" when button is clicked', () => {
//     const wrapper = shallowMount(Actions, { store, localVue })
//     wrapper.find('button').trigger('click')
//     expect(actions.actionClick).toHaveBeenCalled()
//   })
// })
