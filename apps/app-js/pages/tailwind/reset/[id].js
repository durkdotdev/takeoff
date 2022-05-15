import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { requester } from "simple-ts-utils";
import { Button, Form, Input } from "tailwind-js";

import { publicRedirectIfAuthenticatedRoute } from "../../../lib/authenticate";
import { getReset } from "../../../lib/prisma/models/reset";

export const getServerSideProps = async (context) => {
  // If signed in, redirect to the dashboard
  const redirect = await publicRedirectIfAuthenticatedRoute(context);
  if (redirect) return redirect;

  // Get Reset
  const id = context.params.id;
  const reset = await getReset(id);
  return { props: { reset } };
};

const ResetPage = ({ reset }) => {
  const [password, setPassword] = useState("");

  /**
   * Request a PUT to api/reset with Reset's Id and new password
   * If successful, redirect the User to login
   * @param event Form Event
   */
  const handleResetPassword = async (event) => {
    event.preventDefault();
    const request = await requester("/api/reset", "PUT", {
      id: reset.id,
      password
    });
    if (request.status === 200) Router.push("/login");
  };

  return (
    <>
      {!reset ? (
        <>
          <h1>Not Found</h1>

          <p>The given link does not exist or has expired.</p>
        </>
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

          <Button type="submit">Reset Password</Button>
        </Form>
      )}

      <Link href="/login">
        <a>Login</a>
      </Link>
    </>
  );
};

export default ResetPage;
