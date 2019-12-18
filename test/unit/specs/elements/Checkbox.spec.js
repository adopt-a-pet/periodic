import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const TestComponent = Vue.extend({
  template: '<Checkbox @change="$emit(\'change\')" />',
});

describe('elements/Checkbox', () => {
  it('checkbox change', () => {
    const wrapper = mount(TestComponent);
    wrapper.find('input[type="checkbox"]').trigger('click');
    expect(wrapper.emitted('change').length).toBe(1);
  });
});
