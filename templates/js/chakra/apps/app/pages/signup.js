import Link from "next/link";
import Router from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { requester } from "simple-ts-utils";
import { Button, Form, Input } from "ui";

import { publicRedirectIfAuthenticatedRoute } from "../lib/authenticate";

export const getServerSideProps = async (context) => {
  // If signed in, redirect to the dashboard
  const redirect = await publicRedirectIfAuthenticatedRoute(context);
  if (redirect) return redirect;
  return { props: {} };
};

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Request a POST to api/user with given email and password
   * If successful, redirect user to login
   * @param event Form Event
   */
  const handleSignUp = async (event) => {
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
          isRequired={true}
          label="Email Address"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email Address"
          type="email"
          value={email}
        />

        <Input
          isRequired={true}
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
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
