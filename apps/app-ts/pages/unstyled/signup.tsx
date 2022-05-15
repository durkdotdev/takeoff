import { GetServerSideProps } from "next";
import Link from "next/link";
import Router from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { requester } from "simple-ts-utils";
import { Button, Form, Input } from "unstyled-ts";

import { publicRedirectIfAuthenticatedRoute } from "../../lib/authenticate";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // If signed in, redirect to the dashboard
  const redirect = await publicRedirectIfAuthenticatedRoute(context);
  if (redirect) return redirect;
  return { props: {} };
};

const SignUpPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  /**
   * Request a POST to api/user with given email and password
   * If successful, redirect user to login
   * @param event Form Event
   */
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const request = await requester("/api/user/signup", "POST", {
      email,
      password
    });
    if (request.status === 200) Router.push("/login");
  };

  return (
    <>
      <Form onSubmit={handleSignUp}>
        <Input
          label="Email Address"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email Address"
          required
          type="email"
          value={email}
        />

        <Input
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
          type="password"
          value={password}
        />

        <Button type="submit">Sign Up</Button>
      </Form>

      <Link href="/login">
        <a>Already have an account? Login here</a>
      </Link>

      {/* Request next-auth sign-in with Google on click  */}
      <button onClick={() => signIn("google")}>Sign Up With Google</button>
    </>
  );
};

export default SignUpPage;
