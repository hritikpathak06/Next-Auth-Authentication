"use client";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { credentialLogin } from "@/actions/login";
import { useRouter } from "next/navigation";




const LoginForm = () => {
    const router = useRouter();
  return (
    <form
      action={async (formData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        if (!email || !password) {
          toast.error("Please Provide All Fields");
        }
        const toastId = toast.loading("logging In");
        const error = await credentialLogin(email, password);
        if (!error) {
          toast.success("Login Successfull", {
            id: toastId,
          });
          router.refresh();
        } else {
          toast.error(error, {
            id: toastId,
          });
        }
      }}
      className=" flex flex-col gap-3"
    >
      <Input placeholder="Email" type="email" name="email" />
      <Input placeholder="Password" type="password" name="password" />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
