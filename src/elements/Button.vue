<template>
  <component
    :is="type"
    :href="href"
    :type="submit"
    :class="['button', `button--${color}`, `button--${size}`, state, variation]">
      <slot/>
  </component>
</template>

<script>
/**
 * Buttons are generally used for interface actions. Suitable for all-purpose use.
 * Defaults to appearance that has white background with grey border. Primary style should be used only once per view for main call-to-action.
 */
export default {
  name: "Button",
  status: "prototype",
  release: "3.5.0",
  props: {
    /**
     * The html element used for the button.
     * `button, a`
     */
    type: {
      type: String,
      default: "button",
      validator: value => {
        return value.match(/(button|a)/)
      },
    },
    /**
     * The size of the button. Defaults to medium.
     * `small, medium, large`
     */
    size: {
      type: String,
      default: "large",
      validator: value => {
        return value.match(/(small|large)/)
      },
    },
    /**
     * When setting the button’s type to a link, use this option to give a href.
     */
    href: {
      type: String,
      default: null,
    },
    /**
     * Set the button’s type to “submit”.
     */
    submit: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(null|submit)/)
      },
    },
    /**
     * Manually trigger various states of the button.
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
     * Style variation to give additional meaning.
     * `primary, secondary`
     */
    variation: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(primary|secondary)/)
      },
    },
    /**
     * Color allows us to easily change the color.
     * `color`
     */
    color: {
      type: String,
      default: "green",
      validator: value => {
        return value.match(/(green)/)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
$btn-shade-hover: inset 0 -3px 0 0 rgba(0, 0, 0, 0.4);
$btn-shade-active: inset 0 3px 4px 0 rgba(0, 0, 0, 0.4);

.button {
  display: block;
  background-color: color(awhite, base);
  @include border(2px solid color(agray, light));
  border-radius: $border-radius;
  color: color(agray, light);
  // font-family: $museo700;
  font-weight: 700;
  @include rem-fallback("font-size", 20px);
  cursor: pointer;
  line-height: 2.7;
  width: 100%;
  transition: background 0.2s ease;
  margin: 0 auto;
  padding: 0;

  &:focus {
    outline: 0;
  }

  &:hover {
    background-color: $color_forty_per_lighter_grey;
    @include border(2px solid color(agray, light));
    color: color(agray, light);
  }

  &:active {
    background-color: color(agray, light);
    color: color(awhite, base);
  }

  @include modifier("disabled") {
    background-color: color(agray, lighter);
    border: 0;
    line-height: 2.9;
    cursor: not-allowed;
    pointer-events: none;
    color: color(awhite);
  }

  @include modifier("small") {
    line-height: 2.5;
    @include rem-fallback("font-size", 16px);
  }

  @include modifier("small-disabled") {
    border: 0;
    line-height: 2.2;
    background-color: color(agray, lighter);
    cursor: not-allowed;
    pointer-events: none;
    color: color(awhite);
  }

  @include modifier("green") {
    background-color: color(agreen, base);
    border: 0;
    line-height: 2.9;
    color: color(awhite, base);

    &:hover {
      background-color: color(agreen, dark);
      border: 0;
      box-shadow: $btn-shade-hover;
      color: color(awhite, base);
    }

    &:active {
      background-color: color(agreen, base);
      box-shadow: $btn-shade-active;
    }
  }

  @include modifier("green-small") {
    @extend .button--green;
    @extend .button--small;
    line-height: 2.75;
  }

  @include modifier("orange") {
    background-color: color(aorange, base);
    border: 0;
    line-height: 2.9;
    color: color(awhite, base);

    &:hover {
      background-color: color(aorange, dark);
      border: 0;
      box-shadow: $btn-shade-hover;
      color: color(awhite, base);
    }

    &:active {
      background-color: color(aorange, base);
      box-shadow: $btn-shade-active;
    }
  }

  @include modifier("orange-small") {
    @extend .button--orange;
    @extend .button--small;
    line-height: 2.75;
  }

  @include modifier("blue") {
    background-color: color(ablue, base);
    border: 0;
    line-height: 2.9;
    color: color(awhite, base);

    &:hover {
      box-shadow: $btn-shade-hover;
      border: 0;
      background-color: color(ablue, dark);
      color: color(awhite, base);
    }

    &:active {
      box-shadow: $btn-shade-active;
      background-color: color(ablue, base);
    }
  }

  @include modifier("blue-small") {
    @extend .button--blue;
    @extend .button--small;
    line-height: 2.75;
  }

  &.is-disabled {
    border: 0;
    background-color: color(agray, lighter);
    cursor: not-allowed;
    pointer-events: none;
    color: color(awhite);
  }

  @include element("image") {
    float: left;
    @include rem-fallback("width", 58px);
    @include rem-fallback("height", 58px);
    display: flex;
  }

  @include element("icon") {
    fill: color(awhite);
    @include rem-fallback("width", 24px);
    @include rem-fallback("height", 23px);
    display: inline-flex;
    vertical-align: middle;
    @include rem-fallback("margin-right", 5px);
  }

  // @include element ('ask-about-me') {
  //     font-family: $museo700;
  //     color: color(awhite);
  //     @include font-size(20);
  //     @include rem-fallback('line-height', 26px);
  //     @include rem-fallback('letter-spacing', -.25px);
  // }
}
</style>

<docs>
  ```jsx
  <div>
    <Button variation="primary" size="large">Primary Button</Button>
    <br />
    <Button variation="primary" size="medium">Medium</Button>
    <br />
    <Button variation="primary" size="small">Small</Button>
    <br />
    <Button>Default Button</Button>
    <br />
    <Button state="hover">:hover</Button>
    <br />
    <Button state="active">:active</Button>
    <br />
    <Button state="focus">:focus</Button>
  </div>
  ```
</docs>
