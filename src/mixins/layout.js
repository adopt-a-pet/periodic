
const layoutChecks = [
  {
    name: 'desktop',
    check() { return window.matchMedia('(min-width: 977px)').matches; },
  },
  {
    name: 'tablet',
    check() { return window.matchMedia('(min-width: 750px) AND (max-width: 976px)').matches; },
  },
  {
    name: 'mobile',
    check() {
      return window.matchMedia('(max-width: 749px)').matches;
    },
  },
];

function setLayout() {
  // Find the first matching media query.
  const layout = layoutChecks.find(n => n.check());

  if (layout) {
    this.layout = layout.name;
  }
}

function data() {
  return {
    layout: 'desktop',
    $_setLayout: null,
  };
}

function created() {
  this.$_setLayout = setLayout.bind(this);

  window.addEventListener('resize', this.$_setLayout);

  this.$_setLayout();
}

function beforeDestroy() {
  window.removeEventListener('resize', this.$_setLayout);
}

export default {
  created,
  data,
  beforeDestroy,
};
