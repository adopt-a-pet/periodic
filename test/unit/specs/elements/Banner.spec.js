import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const TestComponent = Vue.extend({
  template: '<Banner @close="$emit(\'close\')" />',
});

describe('elements/Banner', () => {
  it('banner close click', () => {
    const wrapper = mount(TestComponent);
    wrapper.find('.periodic-banner-popup__close').trigger('click');
    expect(wrapper.emitted('close').length).toBe(1);
  });
});
