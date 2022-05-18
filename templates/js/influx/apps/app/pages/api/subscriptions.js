import { getSession } from "next-auth/react";

import { getUser } from "../../lib/prisma/models/user";
import {
  createBillingPortal,
  createCheckout,
  getCustomerSubscription
} from "../../lib/stripe";

const handler = async (req, res) => {
  try {
    const session = await getSession({ req });
    if (session && req.method === "GET") {
      const { priceId } = req.query;

      // Get User and potential Subscription
      const user = await getUser({ id: session.id });
      const subscription = await getCustomerSubscription(user.customerId);

      // If User has a Subscription, create a Stripe Billing Portal
      if (subscription) {
        const billingPortal = await createBillingPortal(user.customerId);
        return res.status(200).json({ url: billingPortal.url });
      }

      // Else, create a Stripe Checkout
      const checkout = await createCheckout(user.customerId, priceId);
      return res.status(200).json({ url: checkout.url });
    } else return res.status(401).end();
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default handler;
