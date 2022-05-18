import Link from "next/link";
import { signOut } from "next-auth/react";

import { MARKETING_URL } from "../lib";
import { protectRoute } from "../lib/authenticate";

export const getServerSideProps = async (context) => {
  // If not signed in, redirect to login
  const serverAuthentication = await protectRoute(context);
  if (serverAuthentication.redirect) return serverAuthentication.redirect;
  return { props: {} };
};

const DashboardPage = () => {
  return (
    <>
      <Link href="/account">
        <a>My Account</a>
      </Link>

      <button onClick={() => signOut({ callbackUrl: MARKETING_URL })}>
        Sign Out
      </button>
    </>
  );
};

export default DashboardPage;
