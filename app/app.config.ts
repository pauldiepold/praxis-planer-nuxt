export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'emerald',
      secondary: 'yellow',
      neutral: 'zinc',
    },
    pageHeader: {
      slots: {
        root: '!border-b-0',
      },
    },
    button: {
      slots: {
        base: 'rounded-lg',
      },
      variants: {
        size: {
          md: {
            base: 'px-4 py-2',
          },
          lg: {
            base: 'px-6 py-3',
          },
        },
      },
    },
    navigationMenu: {
      compoundVariants: [
        {
          variant: 'pill',
          active: true,
          highlight: false,
          class: {
            link: 'before:bg-primary-100',
          },
        },
      ],
    },
  },
})
