"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";


export const credentialLogin = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/hero",
    });
    console.log("Successs");
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.message;
  }
};
