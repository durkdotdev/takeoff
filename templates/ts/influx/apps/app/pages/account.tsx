import { GetServerSideProps } from "next";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { requester } from "simple-ts-utils";

import { MARKETING_URL } from "../lib";
import { protectRoute } from "../lib/authenticate";
import { getUser, User } from "../lib/prisma/models/user";
import { getCustomerSubscription, Subscription } from "../lib/stripe";
// import { calculateTrialTimeLeft } from "../lib/stripe";

interface AccountPageProps {
  subscription: Subscription;
  user: User;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // If not signed in, redirect to login
  const serverAuthentication = await protectRoute(context);
  if (serverAuthentication.redirect) return serverAuthentication.redirect;

  const user = await getUser({ id: serverAuthentication.session.id as string });
  const subscription = await getCustomerSubscription(user.customerId);
  return { props: { subscription, user } };
};

const AccountPage = ({ subscription, user }: AccountPageProps) => {
  /**
   * Request a POST to api/user with given email and password
   * If successful, sign out and return to Marketing page
   */
  const handleDeleteAccount = async () => {
    const request = await requester("/api/user", "DELETE");
    if (request.status === 200) signOut({ callbackUrl: MARKETING_URL });
  };

  return (
    <>
      <h1>Account</h1>

      <p>
        {subscription
          ? `You currently have a ${subscription.product.name}`
          : "You currently don't have a subscription"}
      </p>

      {/* If using Trials, show how many days User has left until Trial expires */}
      {/* <p>
        {subscription && subscription.subscription.trial_end && (
          <span>
            Your trial has{" "}
            {calculateTrialTimeLeft(subscription.subscription.trial_end)} days
            remaining.
          </span>
        )}
      </p> */}

      <Link href="/subscriptions">
        <a>
          {subscription
            ? "Manage subscriptions here"
            : "View available subscriptions here"}
        </a>
      </Link>

      <button onClick={() => handleDeleteAccount()}>Delete Account</button>
    </>
  );
};

export default AccountPage;
