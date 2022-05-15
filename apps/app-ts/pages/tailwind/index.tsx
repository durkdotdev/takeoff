import { GetServerSideProps } from "next";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ThemeButton } from "tailwind-ts";

import { MARKETING_URL } from "../../lib";
import { protectRoute } from "../../lib/authenticate";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // If not signed in, redirect to login
  const serverAuthentication = await protectRoute(context);
  if (serverAuthentication.redirect) return serverAuthentication.redirect;
  return { props: {} };
};

const DashboardPage = () => {
  return (
    <>
      <ThemeButton />

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
