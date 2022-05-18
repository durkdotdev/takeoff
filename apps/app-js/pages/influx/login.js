import { Button, Form, GoogleButton, Input } from "influx-js";
import Link from "next/link";
import Router from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { publicRedirectIfAuthenticatedRoute } from "../../lib/authenticate";

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
      <main className="flex-col min-h-screen space-y-8 main main-centered">
        <h1 className="text-3xl font-bold">Login</h1>

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

          <Button className="!mt-6" type="submit">
            Login
          </Button>
        </Form>

        <div className="flex flex-col items-center space-y-2">
          <p className="sub-text">
            Don{"'"}t have an account?{" "}
            <Link href="/signup">
              <a className="link-text">Sign up</a>
            </Link>
          </p>

          <p className="sub-text">
            Forgot your password?{" "}
            <Link href="/reset">
              <a className="link-text">Reset password</a>
            </Link>
          </p>
        </div>

        <div className="max-w-lg divider divider-light" />

        {/* Request next-auth sign-in with Google on click  */}
        <GoogleButton onClick={() => signIn("google")} />
      </main>
    </>
  );
};

export default LoginPage;
