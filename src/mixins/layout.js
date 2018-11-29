
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
  };
}

function created() {
  const setLayoutName = setLayout.bind(this);

  setLayoutName();
  window.addEventListener('resize', setLayoutName);
}

export default {
  created,
  data,
};
