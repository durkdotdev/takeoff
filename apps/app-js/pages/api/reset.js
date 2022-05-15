import bcrypt from "bcryptjs";

import { sendResetEmail } from "../../lib/email";
import {
  createReset,
  deleteResets,
  getReset
} from "../../lib/prisma/models/reset";
import { getUser, updateUser } from "../../lib/prisma/models/user";

const handler = async (req, res) => {
  switch (req.method) {
    case "POST": {
      try {
        const user = await getUser({ email: req.body.email });

        if (user) {
          // delete any pre-existing resets
          await deleteResets(req.body.email);

          const newReset = await createReset(req.body.email);
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
