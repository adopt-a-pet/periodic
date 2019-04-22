<template>
  <div :class="b().toString()">
    <div :class="b('content').toString()">
      <Heading
        :level="layout === 'desktop' ? 'h1' : 'h2'"
        font-weight="bold"
        font-family="museo">
        What are New Pet Alerts?
      </Heading>

      <VSpacer
        size="xl" />

      <Paragraph
        text-align="left"
        color="gray"
        font-weight="normal">
        New pets are posted to our site daily. We'll email you as soon as a new
        pet that matches your search is added, so you won't miss out.
      </Paragraph>

      <VSpacer
        size="l" />

      <VDivider />

      <VSpacer
        size="l" />

      <Heading
        :level="'h2'"
        font-weight="bold"
        font-family="museo">
        Here's How It Works
      </Heading>

      <VSpacer
        size="l" />

      <ol :class="b('steps').toString()">
        <li>
          <Paragraph
            text-align="left"
            font-weight="light">
            New pets are posted to our site daily. We'll email you as soon as a new
            pet that matches your search is added, so you won't miss out.
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

      <VSpacer
        size="m" />

      <VDivider />

      <VSpacer
        size="l" />

      <Paragraph
        text-align="left"
        color="gray"
        font-weight="normal">
        It's that easy! You can save up to 15 New Pet Alerts, and you can cancel or change them at any time.
      </Paragraph>
    </div>
  </div>
</template>

<script>
/**
 * NPA signup form
 */

export default {
  name: 'NPASignupWhatIsThis',
  blockName: 'npa-signup-whatisthis',
  status: 'under-review',
  release: '1.0.0',

  props: {
  },

  data() {
    return {
      email: '',
      dontShow: false,
    };
  },

  computed: {
  },

  methods: {
  },
};
</script>

<docs>
```vue
<template>
  <NPASignupWhatIsThis />
</template>
<script>
export default {
  data() {
    return {
    }
  }
};
</script>
```
</docs>
