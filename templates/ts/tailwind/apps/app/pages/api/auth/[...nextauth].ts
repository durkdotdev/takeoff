import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// import { sendWelcomeEmail } from "../../../lib/email";
import { deleteResets } from "../../../lib/prisma/models/reset";
import { createUser, getUser } from "../../../lib/prisma/models/user";
import { createCustomer } from "../../../lib/stripe";
// import { createTrial } from "../../../lib/stripe";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const user = await getUser({ email: credentials.email });
          const match = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (user && match) {
            // delete any potential password Resets associated with this User
            await deleteResets(user.email);
            return user;
          }

          return null;
        } catch (error) {}
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user;
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        const user = await getUser({ email: token.email });
        session.id = user.id;
      } else {
        if (token.id) session.id = token.id;
      }
      delete session.user;

      return session;
    },
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        const customer = await createCustomer(profile.email);
        const user = await getUser({ customerId: customer.id });
        if (!user) {
          await createUser(customer.id, profile.email, "google");

          // (Optional) Create a free Trial Subscription for the Stripe customer
          // await createTrial(customer.id);

          // (Optional) Send welcome email
          // await sendWelcomeEmail(profile.email);
        }

        if (user) {
          // delete any potential password Resets associated with this User
          await deleteResets(user.email);
          return true;
        }
      } else {
        return true;
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET
});
