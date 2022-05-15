import { Button, Form, Input } from "daisy-ts";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { requester } from "simple-ts-utils";

import { publicRedirectIfAuthenticatedRoute } from "../../../lib/authenticate";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // If signed in, redirect to the dashboard
  const redirect = await publicRedirectIfAuthenticatedRoute(context);
  if (redirect) return redirect;
  return { props: {} };
};

const CreateResetPage = () => {
  const [email, setEmail] = useState<string>("");

  /**
   * Request a POST to api/reset with given email to create a Reset
   * If successful, an email will be sent
   * @param event Form Event
   */
  const handleCreateReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const request = await requester("/api/reset", "POST", { email });
    if (request.status === 200) setEmail("");
  };

  return (
    <>
      <Form onSubmit={handleCreateReset}>
        <Input
          label="Email Address"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email Address"
          required
          type="email"
          value={email}
        />

        <Button type="submit">Send Password Reset</Button>
      </Form>

      <Link href="/login">
        <a>Login</a>
      </Link>
    </>
  );
};

export default CreateResetPage;
