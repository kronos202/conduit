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
    <div className="mx-auto w-[500px] bg-gray-100 p-5 rounded-md">
      <div className="mb-4">
        <h2 className="text-4xl font-semibold text-green-500">Sign In</h2>
        <Link to="/register" className="underline">
          Do not have an account?
        </Link>
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
                    className="p-6 border-gray-300 shadow-md"
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
                    className="p-6 border-gray-300 shadow-md"
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

      <GoogleLogin
        onSuccess={(data) =>
          loginGoogle({ idToken: data.credential as string })
        }
        onError={() => console.log("error")}
      />
    </div>
  );
};

export default Login;
