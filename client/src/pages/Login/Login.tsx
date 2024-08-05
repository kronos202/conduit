import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { LoadingSpinner } from "@/components/spinner";
import { useLogin } from "@/hooks/auth/mutations/useLogin";

const Login = () => {
  const { isPending, isSuccess, login } = useLogin();

  const navigate = useNavigate();

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginBodyType) {
    login(values);

    if (isSuccess) {
      form.reset({ email: "", password: "" });
      navigate("/");
    }
  }
  return (
    <div className="mx-auto w-[500px] bg-gray-100 p-5 rounded-md">
      <div className="mb-4">
        <h2 className="font-semibold text-4xl">Sign In</h2>
        <Link to="/login">Have an account?</Link>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="p-6 shadow-md border-gray-300"
                    placeholder="email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormControl>
                  <Input
                    className="p-6 shadow-md border-gray-300"
                    placeholder="password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? <LoadingSpinner /> : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
