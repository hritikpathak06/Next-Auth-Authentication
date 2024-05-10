import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import User from "@/libs/models/userModel";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";



const SignupPage = () => {
  return (
    <div className=" flex justify-center items-center h-dvh">
      <Card className=" md:w-[30%] w-[90%]">
        <CardHeader>
          <CardTitle className=" text-center">Signup Here</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData: FormData) => {
              "use server";
              const name = formData.get("name") as string | undefined;
              const email = formData.get("email") as string | undefined;
              const password = formData.get("password") as string | undefined;

              if (!email || !name || !password) {
                throw new Error("Please Fill Out All The Fields");
              }

              //   Database connection

              const user = await User.findOne({ email });

              if (user) throw new Error("User Already Exists");

              // Create new user
              const hashedPassword = await bcrypt.hash(password, 10);

              await User.create({
                name,
                email,
                password: hashedPassword,
              });
              redirect("/login");
            }}
            className=" flex flex-col gap-3"
          >
            <Input placeholder="Name" type="name" name="name" />
            <Input placeholder="Email" type="email" name="email" />
            <Input placeholder="Password" type="password" name="password" />
            <Button type="submit">Sign Up</Button>
          </form>
        </CardContent>
        <CardFooter className=" flex flex-col gap-4">
          <span>Or</span>
          <form>
            <Button type="submit" variant="ghost">
              Login With Google
            </Button>
          </form>
          <Link href={"login"}>Already have an account? login</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;
