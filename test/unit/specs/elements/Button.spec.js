import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const TestComponent = Vue.extend({
  template: '<Button></Button>',
});

describe('elements/Button', () => {
  it('button click', () => {
    const wrapper = mount(TestComponent);

    wrapper.find('button').trigger('click');

    expect(wrapper.emitted('click').length).toBe(1);
  });
});
