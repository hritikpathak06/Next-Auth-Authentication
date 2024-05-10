import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import User from "./libs/models/userModel";
import { compare } from "bcryptjs";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please Provide Both Email And Password");
        }

        // Connection with database here

        const user = await User.findOne({ email });

        if (!user) {
          throw new CredentialsSignin("Invalid Email Or Password");
        }

        if (!user.password) {
          throw new CredentialsSignin("Invalid Email Or Password");
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
          throw new CredentialsSignin("Invalid Password");
        }
        return { name: user.name, email: user.email, id: user._id };
      },
    }),
  ],
});
