import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const TestComponent = Vue.extend({
  template: '<Dropdown label="With Search" :items="[{ display: \'One\', value: 1 }, { display: \'Two\', value: 2 }]" :search="true" :specialChoices="[{ display: \'Any\', value: null }]" tooltip="This is an info bubble" />',
});

describe('elements/Dropdown', () => {
  it('filter results', () => {
    const wrapper = mount(TestComponent);
    const textInput = wrapper.find('input[type="text"]');
    const listItems = wrapper.findAll('li');

    expect(listItems.length).toBe(3);
    textInput.setValue('Two');
    expect(wrapper.findAll('li').length).toBe(2);
  });
});
