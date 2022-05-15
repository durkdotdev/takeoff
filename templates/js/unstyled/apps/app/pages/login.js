import Link from "next/link";
import Router from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button, Form, Input } from "ui";

import { publicRedirectIfAuthenticatedRoute } from "../lib/authenticate";

export const getServerSideProps = async (context) => {
  // If signed in, redirect to the dashboard
  const redirect = await publicRedirectIfAuthenticatedRoute(context);
  if (redirect) return redirect;
  return { props: {} };
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Request next-auth sign-in with given email and password
   * If successful, redirect user to the dashboard
   * @param event Form Event
   */
  const handleLogin = async (event) => {
    event.preventDefault();
    const request = await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    if (request.status === 200) Router.push("/");
  };

  return (
    <>
      <Form onSubmit={handleLogin}>
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

        <Button type="submit">Login</Button>
      </Form>

      <Link href="/reset">
        <a>Forgot Password?</a>
      </Link>

      <Link href="/signup">
        <a>Don{"'"}t have an account? Sign up here</a>
      </Link>

      {/* Request next-auth sign-in with Google on click  */}
      <button onClick={() => signIn("google")}>Login With Google</button>
    </>
  );
};

export default LoginPage;
