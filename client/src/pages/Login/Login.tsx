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
import { GoogleLogin } from "@react-oauth/google";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { LoadingSpinner } from "@/components/spinner";
import { useLogin } from "@/hooks/auth/mutations/useLogin";
import { useLoginGoogle } from "@/hooks/auth/mutations/useLoginGoogle";

const Login = () => {
  const { isPending, login } = useLogin();
  const { loginGoogle } = useLoginGoogle();

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginBodyType) {
    login(values);

    // if (isSuccess) {
    //   form.reset({ email: "", password: "" });
    //   navigate("/");
    // }
  }
  return (
    <div className="w-full max-w-md p-6 mx-auto mt-10 bg-white shadow-lg sm:p-8 rounded-xl">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-green-500">Sign In</h2>
        <Link to="/register" className="inline-block mt-2 text-sm text-gray-500 hover:underline">
          Don't have an account?
        </Link>
      </div>
  
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                    placeholder="Email"
                    type="email"
                    autoComplete="email"
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
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                    placeholder="Password"
                    type="password"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <Button
            type="submit"
            disabled={isPending}
            className="w-full py-2 font-medium text-white transition bg-green-500 rounded-md hover:bg-green-600"
          >
            {isPending ? <LoadingSpinner /> : "Sign In"}
          </Button>
        </form>
      </Form>
  
      <div className="flex justify-center mt-6">
        <GoogleLogin
          onSuccess={(data) =>
            loginGoogle({ idToken: data.credential as string })
          }
          onError={() => console.log("error")}
        />
      </div>
    </div>
  );
  
};

export default Login;
