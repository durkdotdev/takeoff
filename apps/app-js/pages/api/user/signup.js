import bcrypt from "bcryptjs";

// import { sendWelcomeEmail } from "../../../lib/email";
import { createUser } from "../../../lib/prisma/models/user";
import { createCustomer } from "../../../lib/stripe";
// import { createTrial } from "../../../lib/stripe";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      // Hash user's password before storing in database
      const hashed = await bcrypt.hash(req.body.password, 8);

      // Create or get Stripe customer for the given email
      const customer = await createCustomer(req.body.email);

      // (Optional) Create a free Trial Subscription for the Stripe customer
      // await createTrial(customer.id);

      // Create a new User Model in the database
      // Use signupType = credentials
      await createUser(
        customer.id,
        req.body.email,
        "credentials",
        hashed.toString()
      );

      // (Optional) Send welcome email
      // await sendWelcomeEmail(req.body.email);

      return res.status(200).end();
    } else return res.status(405).end();
  } catch (error) {
    // error.meta is a Prisma error for a model already existing with a unique input
    // If error.meta, a user with that email already exists
    if (error.meta) res.status(403).end();

    return res.status(500).end();
  }
};

export default handler;
