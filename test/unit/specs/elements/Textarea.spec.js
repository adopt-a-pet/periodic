import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const TestComponent = Vue.extend({
  template: '<Textarea @blur="$emit(\'blur\')" @input="$emit(\'input\')"></Textarea>',
});

describe('elements/Textarea', () => {
  const wrapper = mount(TestComponent);

  it('textarea input', () => {
    wrapper.find('textarea').setValue('Some text');
    expect(wrapper.emitted('input').length).toBe(1);
  });

  it('textarea blur', () => {
    wrapper.find('textarea').trigger('blur');
    expect(wrapper.emitted('blur').length).toBe(1);
  });
});
