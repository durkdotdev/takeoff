import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import {
  deleteUser,
  getUser,
  updateUser
} from "../../../lib/prisma/models/user";
import { deleteCustomer, updateAccountEmail } from "../../../lib/stripe";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (session) {
    switch (req.method) {
      case "DELETE": {
        try {
          const user = await getUser({ id: session.id as string });

          // Delete Customer in Stripe dashboard
          await deleteCustomer(user.customerId);

          // Delete User
          await deleteUser({ id: user.id });
          return res.status(200).end();
        } catch (error) {
          return res.status(500).send(error);
        }
      }
      case "GET": {
        try {
          // Get User and return it
          return res
            .status(200)
            .json(await getUser({ id: session.id as string }));
        } catch (error) {
          return res.status(500).send(error);
        }
      }
      case "PUT": {
        try {
          // Update User
          const user = await updateUser({ id: session.id as string }, req.body);
          if (req.body.email)
            await updateAccountEmail(user.customerId, req.body.email);
          return res.status(200).end();
        } catch (error) {
          return res.status(500).send(error);
        }
      }
      default:
        return res.status(401).end();
    }
  } else return res.status(404).end();
};

export default handler;
