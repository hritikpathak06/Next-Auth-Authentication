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

const LoginPage = () => {
  return (
    <div className=" flex justify-center items-center h-dvh">
      <Card className=" md:w-[30%] w-[90%]">
        <CardHeader>
          <CardTitle className=" text-center">Login Here</CardTitle>
        </CardHeader>
        <CardContent>
          <form action="" className=" flex flex-col gap-3">
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
            <Button type="submit">Login</Button>
          </form>
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
