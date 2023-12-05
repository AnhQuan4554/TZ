export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  nextRouter: {
    path: '/', // defaults to `/`
    asPath: '/', // defaults to `/`
    query: {}, // defaults to `{}`
    push() {}, // defaults to using addon actions integration,
    //   can override any method in the router
  },
};
