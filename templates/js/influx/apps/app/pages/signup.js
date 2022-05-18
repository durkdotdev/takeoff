import Link from "next/link";
import Router from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { requester } from "simple-ts-utils";
import { Button, Form, GoogleButton, Input } from "ui";

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
      <main className="flex-col min-h-screen space-y-8 main main-centered">
        <h1 className="text-3xl font-bold">Sign Up</h1>
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

          <Button className="!mt-6" type="submit">
            Sign Up
          </Button>
        </Form>

        <p className="sub-text">
          Already have an account?{" "}
          <Link href="/login">
            <a className="link-text">Login</a>
          </Link>
        </p>

        <div className="max-w-lg divider divider-light" />

        {/* Request next-auth sign-in with Google on click  */}
        <GoogleButton onClick={() => signIn("google")} />
      </main>
    </>
  );
};

export default SignUpPage;
