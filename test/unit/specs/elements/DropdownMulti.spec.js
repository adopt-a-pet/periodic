import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const TestComponent = Vue.extend({
  template: '<DropdownMulti v-model="selectedOptions" label="With Search" :items="[{ display: \'Red\', value: 1, labelRight: \'(0)\' }, { display: \'Green\', value: 2, labelRight: \'(2)\' }, { display: \'Blue\', value: 3, labelRight: \'(5)\' }]" :search="true" tooltip="This is an info bubble" @change="$emit(\'change\')" />',
});

describe('elements/DropdownMulti', () => {
  const wrapper = mount(TestComponent, {
    data() {
      return { selectedOptions: [2, 3] };
    },
  });
  const textInput = wrapper.find('input[type="text"]');
  const listItems = wrapper.findAll('li');

  it('selects option', () => {
    expect(wrapper.vm.selectedOptions.length).toBe(2);
    listItems.at(0).trigger('mousedown');
    expect(wrapper.vm.selectedOptions.length).toBe(3);
  });

  it('filters results', () => {
    expect(wrapper.vm.selectedOptions.length).toBe(3);
    textInput.setValue('Green');
    expect(wrapper.findAll('li').length).toBe(1);
  });
});
