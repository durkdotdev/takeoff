# create-takeoff

This repository was created with [TAKEOFF](https://takeoff.durk.dev.com) and the `npx create-takeoff` command.

## What's Inside

TAKEOFF automatically created the following apps/packages:

### Apps

- `app`: Your SaaS [Next.js](https://nextjs.org) app with a database, Stripe subscriptions, and user authentication enabled
- `marketing`: Your SaaS [Next.js](https://nextjs.org) marketing website

### Packages

- `ui`: Your SaaS React component library shared by `app` and `marketing` equipped with the design system chosen during the `npx create-takeoff` command

### Scripts

TAKEOFF has automatically generated some helpful scripts:

- `takeoff-init`: Initialize your SaaS after adding database environment variables to `.env`. Run this command prior to running your app for the first time.

```bash
yarn takeoff-init
```

- `dev`: Run your app, marketing, and Prisma Studio in parallel

```bash
yarn dev
```

- `stripe-webhooks`: Generate a Stripe webhook key to use in local testing (remember to add this to your `.env`)

```bash
yarn stripe-webhooks
```

### Utilities

Thanks to [turborepo](https://turborepo.org/), these tools are already setup:

- TypeScript for static type checking (if TypeScript was selected)
- ESLint for code linting
- Prettier for code formatting

## TAKEOFF Docs

To learn more about this repository, visit the [TAKEOFF Docs](https://takeoff-docs.durk.dev).
