import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { sendResetEmail } from "../../lib/email";
import {
  createReset,
  deleteResets,
  getReset,
  Reset
} from "../../lib/prisma/models/reset";
import { getUser, updateUser } from "../../lib/prisma/models/user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST": {
      try {
        const user = await getUser({ email: req.body.email });

        if (user) {
          // delete any pre-existing resets
          await deleteResets(req.body.email);

          const newReset: Reset = await createReset(req.body.email);
          await sendResetEmail(req.body.email, newReset.id);
          return res.status(200).end();
        } else {
          return res.status(403).end();
        }
      } catch (error) {
        return res.status(500).send(error);
      }
    }
    case "PUT": {
      try {
        const reset = await getReset(req.body.id);
        const updatedUser = await updateUser(
          { id: reset.userId },
          {
            password: await bcrypt.hash(req.body.password, 8)
          }
        );
        await deleteResets(updatedUser.email);
        return res.status(200).json(updatedUser);
      } catch (error) {
        return res.status(500).send(error);
      }
    }
    default:
      return res.status(401).end();
  }
};

export default handler;
