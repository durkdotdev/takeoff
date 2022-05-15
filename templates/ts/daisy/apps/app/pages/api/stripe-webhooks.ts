import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import stripe from "../../lib/stripe";

export const config = { api: { bodyParser: false } };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const reqBuffer = await buffer(req);
  try {
    const event: Stripe.Event = stripe.webhooks.constructEvent(
      reqBuffer,
      req.headers["stripe-signature"],
      process.env.STRIPE_SIGNING_SECRET
    );
    const data = event.data;

    // Use these event types to preform actions based on the webhook Stripe sends
    // For more information on webhooks, see: https://stripe.com/docs/api/webhook_endpoints
    // Make sure to have a STRIPE_SIGNING_SECRET Environment Variable
    // To generate a local test secret, run: yarn stripe-webhooks

    switch (event.type) {
      case "customer.subscription.created":
        break;
      case "customer.subscription.updated":
        break;
      case "customer.subscription.deleted":
        break;
      case "invoice.payment_failed":
        break;
    }

    return res.status(200).end();
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default handler;
