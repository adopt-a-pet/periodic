import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const errorMessages = {
  required: 'Come on! Put something here!',
  min: 'Needs to be longer than 10 characters',
};
const TestComponent = Vue.extend({
  template: `<Textarea
      v-model="textarea"
      :min="10"
      :errorMessages="{
        required: '${errorMessages.required}',
        min: '${errorMessages.min}'
      }"
      placeholder="This textarea is required and must have more than 10 characters"
      shortLabel="Required and at least 10 characters"
      required
      @blur="$emit('blur')"
      @input="$emit('input')" />`,
});

describe('elements/Textarea', () => {
  const wrapper = mount(TestComponent, {
    data() {
      return {
        textarea: '',
      };
    },
  });
  const textarea = wrapper.find('textarea');

  it('emits blur event and shows error message for empty required field', () => {
    textarea.setValue('foo');
    textarea.setValue('');
    textarea.trigger('blur');
    expect(wrapper.emitted('blur').length).toBe(1);
    expect(wrapper.text()).toContain(errorMessages.required);
  });

  // it('emits input event and doesn\'t show error message for completed required field', () => {
  //   textarea.setValue('Some text');
  //   textarea.trigger('blur');
  //   expect(wrapper.emitted('input').length);
  //   expect(wrapper.text()).not.toContain(errorMessage);
  // });
});
