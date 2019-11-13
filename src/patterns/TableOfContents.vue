<template>
  <div :class="b().toString()">
    <Heading
      level="h3"
      font-weight="bold">
      <slot />
    </Heading>
    <nav>
      <li
        v-for="(link, index) in links"
        :key="index">
        <TextLink
          v-scroll-to="link.value">
          {{ link.display }}
        </TextLink>
      </li>
    </nav>
  </div>
</template>
<script>
export default {
  /**
   * A list of links that scroll to sections within the page
   */
  name: 'TableOfContents',
  status: 'under-review',
  release: '1.0.0',
  blockName: 'table-of-contents',
  props: {
    /**
      * An array of links to build the table with, following this format:
      * `[{ display: 'Section 1', value: '#section1'}]`. Alternatively, the
      * table will automatically build an index of the `h2` elements on the page
      * that are within an `article` element. If these elements don't have ID
      * attributes, ID attributes will be generated and added.
    */
    links: {
      type: Array,
      default() { return []; },
    },
  },
  data() {
    return {
      headers: null,
    };
  },
  mounted() {
    this.indexHeaders();
  },
  methods: {
    /**
     * Index the headers in the article
     */
    indexHeaders() {
      if (!this.links.length) {
        this.headers = document.querySelectorAll('article')[0].querySelectorAll('h2');
        this.headers.forEach((header, index) => {
          if (!header.id) {
            header.id = `h2-${index}`;
          }
          this.links.push({
            display: header.innerHTML,
            value: `#${header.id}`,
          });
        });
      }
    },
  },
};
</script>
<docs>
  ```vue
  <template>
    <div>
      <TableOfContents :links="links">Contents Generated From an Array</TableofContents>
      <VSpacer />
      <TableOfContents>Contents Generated From the Page</TableOfContents>
      <VSpacer />
      <article>
        <Heading level="h2" id="heading1">First Heading</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </Paragraph>
        <Heading level="h2" id="heading2">Second Heading</Heading>
        <Paragraph>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Paragraph>
        <Heading level="h2">Third Heading</Heading>
        <Paragraph>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </Paragraph>
        <Heading level="h2">Fourth Heading</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </Paragraph>
        <Heading level="h2">Fifth Heading</Heading>
        <Paragraph>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Paragraph>
        <Heading level="h2">Sixth Heading</Heading>
        <Paragraph>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </Paragraph>
      </article>
    </div>
  </template>
  <script>
    export default {
      data() {
        return {
          links: [
            {
              display: 'First Heading',
              value: '#heading1',
            },
            {
              display: 'Second Heading',
              value: '#heading2',
            },
          ],
        }
      }
    }
  </script>
  ```
</docs>
