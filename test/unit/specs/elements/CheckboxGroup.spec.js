import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const TestComponent = Vue.extend({
  template: '<CheckboxGroup @change="$emit(\'change\')" :items="[{ display: \'One\', value: 1, labelRight: \'This is a right label\' }, { display: \'Two\', value: 2 }, { display: \'Three\', value: 3 }]" />',
});

describe('elements/CheckboxGroup', () => {
  it('checkbox in CheckboxGroup change', () => {
    const wrapper = mount(TestComponent);
    const inputs = wrapper.findAll('input[type="checkbox"]');
    inputs.at(0).trigger('click');
    expect(wrapper.emitted('change').length).toBe(1);
  });
});
