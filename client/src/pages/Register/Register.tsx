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
import {
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import { useRegister } from "@/hooks/auth/mutations/useRegister";
import { LoadingSpinner } from "@/components/spinner";

const Register = () => {
  const { isPending, isSuccess, register } = useRegister();
  const navigate = useNavigate();

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: RegisterBodyType) {
    register(values);

    if (isSuccess) {
      form.reset({ email: "", password: "", username: "" });
      navigate("/login");
    }
  }
  return (
    <div className="mx-auto w-[500px] bg-gray-100 p-5 rounded-md">
      <div className="mb-4">
        <h2 className="text-4xl font-semibold text-green-500">Sign Up</h2>
        <Link to="/login" className="underline">
          Have an account?
        </Link>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="p-6 border-gray-300 shadow-md"
                    placeholder="username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
    </div>
  );
};

export default Register;
