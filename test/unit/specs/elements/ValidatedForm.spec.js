import { mount, createLocalVue } from '@vue/test-utils';
import Periodic from '../../../../dist/system/system';

const Vue = createLocalVue();

Vue.use(Periodic);

const testInput = Vue.extend({
  props: {
    name: {
      type: String,
      default: 'test',
    },
  },
  methods: {
    validate: () => false,
  },
  template: '<input type="text" :name="name">',
});

const TestComponent = Vue.extend({
  components: {
    test: testInput,
  },
  methods: {
    validateError(err) {
      this.$emit('validate:error', err);
    },
    submit() {
      this.$emit('submit');
    },
  },
  template: `<ValidatedForm
    :fields="['input1']"
    @submit="submit"
    @validate:error="validateError">

    <test name="input1" />
    <test name="input2" />
  </ValidatedForm>`,
  // input2 is not in the :fields list so it will be ignored
});

describe('elements/ValidatedForm', () => {
  it('should not submit if the field is invalid', done => {
    const wrapper = mount(TestComponent);

    wrapper.find('form').trigger('submit');

    setTimeout(() => {
      expect(wrapper.emitted('submit')).toBeUndefined();
      expect(wrapper.emitted('validate:error').length).toBe(1);
      expect(wrapper.emitted('validate:error')[0][0]).toBe('input1');

      done();
    }, 100);
  });

  it('should submit if the field is valid', done => {
    const testInputValid = testInput.extend({
      methods: {
        validate: () => true,
      },
    });

    const TestComponentValid = TestComponent.extend({
      components: {
        test: testInputValid,
      },
    });

    const wrapper = mount(TestComponentValid);

    wrapper.find('form').trigger('submit');

    setTimeout(() => {
      expect(wrapper.emitted('validate:error')).toBeUndefined();
      expect(wrapper.emitted('submit').length).toBe(1);

      done();
    }, 100);
  });
});
