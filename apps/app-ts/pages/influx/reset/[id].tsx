import { Button, Form, Input } from "influx-ts";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { requester } from "simple-ts-utils";

import { publicRedirectIfAuthenticatedRoute } from "../../../lib/authenticate";
import { getReset, Reset } from "../../../lib/prisma/models/reset";

interface ResetPageProps {
  reset: Reset;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // If signed in, redirect to the dashboard
  const redirect = await publicRedirectIfAuthenticatedRoute(context);
  if (redirect) return redirect;

  // Get Reset
  const id = context.params.id;
  const reset = await getReset(id as string);
  return { props: { reset } };
};

const ResetPage = ({ reset }: ResetPageProps) => {
  const [password, setPassword] = useState<string>("");

  /**
   * Request a PUT to api/reset with Reset's Id and new password
   * If successful, redirect the User to login
   * @param event Form Event
   */
  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const request = await requester("/api/reset", "PUT", {
      id: reset.id,
      password
    });
    if (request.status === 200) Router.push("/login");
  };

  return (
    <>
      <main className="flex-col min-h-screen space-y-8 main main-centered">
        {!reset ? (
          <p className="text-center sub-text">
            The given link does not exist or has expired.
          </p>
        ) : (
          <Form onSubmit={handleResetPassword}>
            <Input
              label="New Password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="New Password"
              required
              type="password"
              value={password}
            />

            <Button className="!mt-6" type="submit">
              Reset Password
            </Button>
          </Form>
        )}

        <Link href="/login">
          <a className="link-text">Login</a>
        </Link>
      </main>
    </>
  );
};

export default ResetPage;
