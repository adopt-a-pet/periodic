<template>
  <div :class="['text-field-container']">
    <input
      :class="[
        inputClass,
        state,
        b.state({
          error: errorState,
          success: successState,
        })
        .has({ content: password })
        .toString()
      ]"
      :disabled="disabled"
      :name="name"
      :required="required"
      :type="showPassword ? 'text' : 'password'"
      v-model.lazy="password"
      v-validate="validations"
      @input="onInput($event.target.value)"
      @focus="onFocus($event.target.value)"
    />
    <!-- <span v-if="successState" class="valid-tick"></span> -->
    <label :for="name" :class="labelClass">{{label}}</label>
    <span class="eye-icon" :class="{'eye-icon__active': showPassword}" @click="showPassword = !showPassword"></span>
    <div v-if="errorState" class="form__error-msg">{{errorMessage}}</div>
  </div>
</template>

<script>
import bemNames from "@/mixins/bem-names"
import validatedInput from "@/mixins/validated-input"

/**
 *
 */
export default {
  name: "PasswordInput",
  status: "under-review",
  release: "1.0.0",
  blockName: "form",
  mixins: [bemNames, validatedInput],
  props: {
    /**
     * The size of the field. Defaults to large.
     * `small, large`
     */
    size: {
      type: String,
      default: "large",
      validator: value => {
        return value.match(/(small|large)/)
      },
    },
    /**
     * Name input field in the form.
     */
    name: {
      type: String,
      default: "password",
    },
    /**
     * Text value of the form input field.
     */
    value: {
      type: String,
      default: "",
    },
    /**
     * The label of the form input field.
     */
    label: {
      type: String,
      default: "Password",
    },
    /**
     * The width of the form input field.
     * `auto, expand`
     */
    width: {
      type: String,
      default: "expand",
      validator: value => {
        return value.match(/(auto|expand)/)
      },
    },
    /**
     * Whether the form input field is disabled or not.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Manually trigger various states of the input.
     * `hover, active, focus`
     */
    state: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(hover|active|focus)/)
      },
    },
    /**
     * Whether the form field is required or not.
     */
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      password: this.value,
      showPassword: false,
    }
  },
  computed: {
    inputClass() {
      const addSize = this.size === "large" ? "" : `-${this.size}`
      return this.b("input") + addSize
    },
    labelClass() {
      const addSize = this.size === "large" ? "" : `-${this.size}`
      return this.b("label") + addSize
    },
    validations() {
      const required = this.required && "required"

      return [required, "min:8"].filter(v => !!v).join("|")
    },
    successState() {
      return this.password && !this.errorState
    },
  },
  errorMessages: {
    min: "Invalid Password",
    required: "Password Required",
  },
}
</script>

<style lang="scss">
.eye-icon {
  background: url("data:image/svg+xml;charset=utf8,%3Csvg%20width%3D%2226px%22%20height%3D%2215px%22%20viewBox%3D%220%200%2026%2015%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.596863678%22%3E%20%3Cpath%20d%3D%22M12.6569293%2C0%20C7.8272192%2C0%203.41870471%2C2.61111111%200.189538043%2C6.88888889%20C-0.0631793478%2C7.25%20-0.0631793478%2C7.72222222%200.189538043%2C8.08333333%20C3.41870471%2C12.3333333%207.8272192%2C14.9444444%2012.6569293%2C14.9444444%20C17.4866395%2C14.9444444%2021.895154%2C12.3333333%2025.1243207%2C8.05555556%20C25.377038%2C7.69444444%2025.377038%2C7.22222222%2025.1243207%2C6.86111111%20C21.895154%2C2.61111111%2017.4866395%2C0%2012.6569293%2C0%20Z%20M12.9938859%2C12.7222222%20C9.79279891%2C12.9166667%207.12522645%2C10.3055556%207.32178442%2C7.11111111%20C7.49026268%2C4.5%209.65240036%2C2.36111111%2012.2918931%2C2.19444444%20C15.4929801%2C2%2018.1605525%2C4.61111111%2017.9639946%2C7.80555556%20C17.7955163%2C10.4444444%2015.6614583%2C12.5555556%2012.9938859%2C12.7222222%20Z%20M12.8534873%2C10.3055556%20C11.1125453%2C10.4166667%209.70855978%2C9%209.79279891%2C7.27777778%20C9.87703804%2C5.86111111%2011.0283062%2C4.72222222%2012.4603714%2C4.63888889%20C14.2013134%2C4.52777778%2015.6052989%2C5.94444444%2015.5210598%2C7.66666667%20C15.4368207%2C9.05555556%2014.2574728%2C10.2222222%2012.8534873%2C10.3055556%20Z%22%20id%3D%22Shape%22%20fill%3D%22%23B3B3B3%22%20fill-rule%3D%22nonzero%22%3E%3C%2Fpath%3E%20%3C%2Fg%3E%20%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  @include rem-fallback("width", 26px);
  @include rem-fallback("height", 15px);
  @include rem-fallback("right", $space-xxs);
  @include rem-fallback("top", $space-l);
  @include rem-fallback("margin-top", -$space-xxxs);
  position: absolute;

  @include element("active") {
    background: url("data:image/svg+xml;charset=utf8,%3Csvg%20width%3D%2226px%22%20height%3D%2215px%22%20viewBox%3D%220%200%2026%2015%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%3Cpath%20d%3D%22M12.6569293%2C0%20C7.8272192%2C0%203.41870471%2C2.61111111%200.189538043%2C6.88888889%20C-0.0631793478%2C7.25%20-0.0631793478%2C7.72222222%200.189538043%2C8.08333333%20C3.41870471%2C12.3333333%207.8272192%2C14.9444444%2012.6569293%2C14.9444444%20C17.4866395%2C14.9444444%2021.895154%2C12.3333333%2025.1243207%2C8.05555556%20C25.377038%2C7.69444444%2025.377038%2C7.22222222%2025.1243207%2C6.86111111%20C21.895154%2C2.61111111%2017.4866395%2C0%2012.6569293%2C0%20Z%20M12.9938859%2C12.7222222%20C9.79279891%2C12.9166667%207.12522645%2C10.3055556%207.32178442%2C7.11111111%20C7.49026268%2C4.5%209.65240036%2C2.36111111%2012.2918931%2C2.19444444%20C15.4929801%2C2%2018.1605525%2C4.61111111%2017.9639946%2C7.80555556%20C17.7955163%2C10.4444444%2015.6614583%2C12.5555556%2012.9938859%2C12.7222222%20Z%20M12.8534873%2C10.3055556%20C11.1125453%2C10.4166667%209.70855978%2C9%209.79279891%2C7.27777778%20C9.87703804%2C5.86111111%2011.0283062%2C4.72222222%2012.4603714%2C4.63888889%20C14.2013134%2C4.52777778%2015.6052989%2C5.94444444%2015.5210598%2C7.66666667%20C15.4368207%2C9.05555556%2014.2574728%2C10.2222222%2012.8534873%2C10.3055556%20Z%22%20id%3D%22Shape%22%20fill%3D%22%234D4D4D%22%20fill-rule%3D%22nonzero%22%3E%3C%2Fpath%3E%20%3C%2Fg%3E%20%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>

<docs>
  ```jsx
  <div>
    <PasswordInput />
    <br>
    <PasswordInput label="Required" required />
    <br>
    <PasswordInput label="Disabled" disabled />
  </div>
  ```
</docs>
