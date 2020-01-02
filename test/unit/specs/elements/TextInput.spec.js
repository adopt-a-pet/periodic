import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);
const errorMessage = 'Required, foo!';
const TestComponent = Vue.extend({
  template: `<TextInput v-model="textInput" :errorMessages="{ required: '${errorMessage}' }" required @blur="$emit('blur')" @input="$emit('input')" />`,
});

describe('elements/TextInput', () => {
  const wrapper = mount(TestComponent, {
    data() {
      return {
        textInput: '',
      };
    },
  });
  const textInput = wrapper.find('input');

  it('emits blur event and shows error message for empty required field', () => {
    textInput.setValue('foo');
    textInput.setValue('');
    textInput.trigger('blur');
    expect(wrapper.emitted('blur').length).toBe(1);
    expect(wrapper.text()).toContain(errorMessage);
  });

  it('emits input event and doesn\'t show error message for completed required field', () => {
    textInput.setValue('Some text');
    textInput.trigger('blur');
    expect(wrapper.emitted('input').length);
    expect(wrapper.text()).not.toContain(errorMessage);
  });
});
