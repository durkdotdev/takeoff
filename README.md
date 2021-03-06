# TAKEOFF

TAKEOFF is a CLI that bootstraps SaaS codebases with a boilerplate powered by a high performance TypeScript/JavaScript Turborepo, multiple Next.js apps, a React component library, and Stripe subscription payments.

To create a TAKEOFF project run the following:

```bash
npx create-takeoff
```

![](./apps/docs/public/images//takeoff_terminal.gif)

### Features

**Languages**: Choose between TypeScript and JavaScript monorepos.

**CSS Frameworks**: TAKEOFF configures a CSS Framework across your monorepo depending on your selection:

- [Influx UI (Default)](https://influx-ui.durk.dev/)
- [Chakra UI](https://chakra-ui.com)
- [Tailwind CSS](https://tailwindcss.com)
- Tailwind CSS + [daisy UI](https://daisyui.com)

Alternatively, you may select `unstyled` to use your own framework or regular CSS.

## What's Inside a TAKEOFF SaaS

- `app`: A SaaS [Next.js](https://nextjs.org) app with a database, Stripe subscriptions, and user authentication enabled
- `marketing`: A SaaS [Next.js](https://nextjs.org) marketing website
- `ui`: React component library shared by `app` and `marketing` equipped with the design system chosen during the `npx create-takeoff` command

## Development Apps and Packages

#### TAKEOFF

- `apps/docs`: TAKEOFF docs, a [Next.js](https://nextjs.org) app

#### create-takeoff

- `packages/create-takeoff`: CLI to create TAKEOFF projects
- `apps/app-<js/ts>`: TAKEOFF base app, a [Next.js](https://nextjs.org) app (JavaScript and TypeScript)
- `apps/marketing-<js/ts>`: TAKEOFF marketing app, a [Next.js](https://nextjs.org) app (JavaScript and TypeScript)

TAKEOFF base apps have multiple iterations of the same app for each UI choice in the TAKEOFF CLI's `create-takeoff` command:

- `pages/chakra`: Pages use `chakra`
- `pages/daisy`: Pages use `daisy`
- `pages/influx`: Pages use `influx`
- `pages/tailwind`: Pages use `tailwind`
- `pages/unstyled`: Pages use `unstyled`

TAKEOFF base apps have multiple UI component libraries for each UI choice in the TAKEOFF CLI's `create-takeoff` command:

- `packages/chakra-<js/ts>`: React component library styled with [Chakra UI](https://chakra-ui.com/)
- `packages/daisy-<js/ts>`: React component library styled with [Daisy UI](https://daisyui.com)
- `packages/influx-<js/ts>`: React component library styled with [Influx Ui](https://influx-ui.durk.dev/)
- `packages/tailwind-<js/ts>`: React component library unstyled but have [Tailwind CSS](https://tailwindcss.com) configured
- `packages/unstyled-<js/ts>`: React component library unstyled serving as a boilerplate UI package

#### Workspace

- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json` used throughout the monorepo for TypeScript projects

## Scripts

Run the TAKEOFF `docs` app:

```bash
yarn dev
```

Run the TAKEOFF base app and marketing page, example PostgreSQL database, and all UI packages (JavaScript or TypeScript):

```bash
yarn dev-<js/ts>
```

Build the TAKEOFF CLI:

```bash
cd packages/create-takeoff
yarn build
```

Build the TAKEOFF CLI Templates:

```bash
yarn templates
```

Format all files:

```bash
yarn format
```
