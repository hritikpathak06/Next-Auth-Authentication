import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoginForm from "@/components/client/form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const LoginPage = async() => {
  const session = await auth();
  if(session?.user){
    redirect("/")
  }
  return (
    <div className=" flex justify-center items-center h-dvh">
      <Card className=" md:w-[30%] w-[90%]">
        <CardHeader>
          <CardTitle className=" text-center">Login Here</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className=" flex flex-col gap-4">
          <span>Or</span>
          <form>
            <Button type="submit" variant="ghost">
              Login With Google
            </Button>
          </form>
          <Link href={"signup"}>Dont have an account? signup</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
