<template>
  <div :class="b().toString()">
    <div :class="b('content').toString()">
      <Heading
        :level="layout === 'tablet-wide' ? 'h1' : 'h2'"
        font-weight="bold">
        What are new pet alerts?
      </Heading>

      <Paragraph
        :style="{
          'text-align': 'left',
          'color': $color_gray_darker,
          'font_weight': $font_weight_normal }">
        New pets are posted to our site daily. We'll email you as soon as a new
        pet that matches your search is added, so you won't miss out.
      </Paragraph>

      <VSpacer size="xs" />

      <VDivider :style="{ 'margin-bottom': $space_m }" />

      <Heading
        :level="'h2'"
        :style="{
          'text-align': 'left',
          'font-weight': $font_weight_bold }">
        Here's how it works
      </Heading>

      <ol :class="b('steps').toString()">
        <li>
          <Paragraph
            text-align="left"
            font-weight="light">
            You select the type of pet you're looking for from our homepage.
            You can also select preferred color, breed, sex, size or age.
            Then hit Search.
          </Paragraph>
        </li>

        <li>
          <Paragraph
            text-align="left"
            font-weight="light">
            In the next screen, type in your email address and hit Save & Continue.
          </Paragraph>
        </li>

        <li>
          <Paragraph
            text-align="left"
            font-weight="light">
            When a pet matching your search criteria is added to our site,
            we'll email you all the info you need to go get your new friend.
          </Paragraph>
        </li>

        <li>
          <Paragraph
            text-align="left"
            font-weight="light">
            We will also periodically send you useful info to help make your
            adoption a success. You can also optionally sign up to receive email
            communications for our sponsors as well.
          </Paragraph>
        </li>
      </ol>

      <VDivider />

      <Paragraph
        :style="{
          'text-align': 'left',
          'color': $color_gray_darker,
          'font-weight': $font_weight_normal }">
        It's that easy! You can save up to 15 New Pet Alerts, and you can cancel or change them at any time.
      </Paragraph>
    </div>
  </div>
</template>

<script>
/**
 * NPA "What is this"
 */

export default {
  name: 'NPASignupWhatIsThis',
  blockName: 'npa-signup-whatisthis',
  status: 'under-review',
  release: '1.0.0',

  props: {},

  data() {
    return {
      email: '',
      dontShow: false,
    };
  },

  computed: {},

  methods: {},
};
</script>

<docs>
```vue
<template>
  <NPASignupWhatIsThis/>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
```
</docs>
