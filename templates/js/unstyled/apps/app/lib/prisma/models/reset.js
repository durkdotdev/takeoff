import prisma from "../prisma";
import { getUser } from "./user";

/**
 * Create a new Reset in the database associated with a User
 * @param {string} email User's email adress
 * @returns
 */
export const createReset = async (email) => {
  const user = await getUser({ email });
  return await prisma.reset.create({
    data: {
      userId: user.id
    }
  });
};

/**
 * Delete all Resets in the database associated with a User
 * @param {string} email User's email adress
 */
export const deleteResets = async (email) => {
  const user = await getUser({ email });
  await prisma.reset.deleteMany({
    where: {
      userId: user.id
    }
  });
};

/**
 * Get a Reset
 * @param {string} id Reset's ID
 * @returns Reset
 */
export const getReset = async (id) => {
  return await prisma.reset.findUnique({
    where: {
      id
    }
  });
};
