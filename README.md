# TAKEOFF

TAKEOFF is a CLI that bootstraps SaaS codebases with a boilerplate powered by a high performance TypeScript/JavaScript Turborepo, multiple Next.js apps, a React component library, and Stripe subscription payments.

## Apps and Packages

#### TAKEOFF

- `apps/docs`: TAKEOFF docs, a [Next.js](https://nextjs.org) app
- `apps/web`: TAKEOFF website, a [Next.js](https://nextjs.org) app
- `packages/ui`: React component library shared by both `web` and `docs`

#### create-takeoff

- `packages/create-takeoff`: CLI to create TAKEOFF projects
- `apps/takeoff-app`: TAKEOFF base app, a [Next.js](https://nextjs.org) app
- `apps/takeoff-marketing`: TAKEOFF marketing app, a [Next.js](https://nextjs.org) app

The TAKEOFF base app has multiple iterations of the same base app for each UI choice in the TAKEOFF CLI's `create-takeoff` command:

- `pages/chakra`: Pages use `chakra`
- `pages/daisy`: Pages use `daisy`
- `pages/tailwind`: Pages use `tailwind`
- `pages/unstyled`: Pages use `unstyled`

The TAKEOFF base app has multiple UI component libraries for each UI choice in the TAKEOFF CLI's `create-takeoff` command:

- `packages/chakra`: React component library styled with [Chakra UI](https://chakra-ui.com/)
- `packages/daisy`: React component library styled with [Daisy UI]()
- `packages/tailwind`: React component library unstyled but have [Tailwind CSS]() configured
- `packages/unstyled`: React component library unstyled serving as a boilerplate UI package

#### Workspace

- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json` used throughout the monorepo

## Scripts

Run the TAKEOFF `docs` and `web` apps, TAKEOFF PostgreSQL database, and `ui` package:

```bash
yarn dev-main
```

Generate a Stripe webhook signing secret for local testing within the TAKEOFF `web` app (add to `.env`):

```bash
yarn stripe-webhooks-main
```

Run the TAKEOFF base app and marketing page, example PostgreSQL database, and all UI packages:

```bash
yarn dev-takeoff
```

Build the TAKEOFF CLI:

```bash
cd packages/create-takeoff
yarn build
```

Format all files:

```bash
yarn format
```
