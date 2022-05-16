# create-takeoff

`create-takeoff` is a CLI to bootstrap a [React](https://reactjs.org), [Next.js](https://nextjs.org) Software as a Service (SaaS) project within a high performance JavaScript or TypeScript [Turborepo](https://turborepo.org).

To get started, run the following command:

```bash
npx create-takeoff
```

Then follow the prompts in your terminal.

## Features

**Languages**: Choose between TypeScript and JavaScript monorepos.

**CSS Frameworks**: TAKEOFF configures a CSS Framework across your monorepo depending on your selection:

- [Chakra UI](https://chakra-ui.com)
- [Tailwind CSS](https://tailwindcss.com)
- Tailwind CSS + [daisy UI](https://daisyui.com)

Alternatively, you may select `unstyled` to use your own framework or regular CSS.

## What's Inside a TAKEOFF SaaS

- `app`: A SaaS [Next.js](https://nextjs.org) app with a database, Stripe subscriptions, and user authentication enabled
- `marketing`: A SaaS [Next.js](https://nextjs.org) marketing website
- `ui`: React component library shared by `app` and `marketing` equipped with the design system chosen during the `npx create-takeoff` command

## Documentation

For more documentation, visit the [official docs](https://takeoff-docs.durk.dev).
