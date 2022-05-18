import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

import { getUser } from "./prisma/models/user";
import { getCustomerSubscription } from "./stripe";

type Redirect = {
  redirect: {
    permanent: boolean;
    destination: string;
  };
};

type ServerSideAuthentication = {
  redirect?: Redirect;
  session?: Session;
};

/**
 * Helper function to protect routes that require a User to be signed in AND require a user to have a Subscription
 * Use this if you want to only make a page availble for  users
 * If not signed in, redirect to /login
 * If not currently on a Subscription, redirect to /subscriptions
 * Use this method in getServerSideProps
 * @param context Next.js context
 * @returns Redirect or current Session
 */
export const paymentRedirect = async (
  context: GetServerSidePropsContext
): Promise<ServerSideAuthentication> => {
  const session = await getSession(context);
  if (!session)
    return {
      redirect: {
        redirect: {
          permanent: false,
          destination: "/login"
        }
      }
    };

  const user = await getUser({ id: session.id as string });
  const subscription = await getCustomerSubscription(user.customerId);

  if (!subscription)
    return {
      redirect: {
        redirect: {
          permanent: false,
          destination: "/subscriptions"
        }
      }
    };

  return { session };
};

/**
 * Helper function to protect routes that require a User to be signed in
 * If not signed in, redirect to /login
 * Use this method in getServerSideProps
 * @param context Next.js context
 * @returns Redirect or current Session
 */
export const protectRoute = async (
  context: GetServerSidePropsContext
): Promise<ServerSideAuthentication> => {
  const session = await getSession(context);
  if (!session)
    return {
      redirect: {
        redirect: {
          permanent: false,
          destination: "/login"
        }
      }
    };

  return { session };
};

/**
 * Helper function to improve User flow
 * If signed in, redirect to dashboard
 * Use this method in getServerSideProps
 * @param context Next.js context
 * @returns Redirect or undefined
 */
export const publicRedirectIfAuthenticatedRoute = async (
  context: GetServerSidePropsContext
): Promise<Redirect | undefined> => {
  const session = await getSession(context);
  if (session)
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    };
};
