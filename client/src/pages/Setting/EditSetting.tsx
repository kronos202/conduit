import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  EditProfileBody,
  EditProfileBodyType,
} from "@/schemaValidations/auth.schema";
import { useEditMe } from "@/hooks/auth/mutations/useEditMe";
import { useContext } from "react";
import { AppContext } from "@/context/app";

const EditProfile = () => {
  const { edit } = useEditMe();
  const { profile } = useContext(AppContext);

  const form = useForm<EditProfileBodyType>({
    resolver: zodResolver(EditProfileBody),
    defaultValues: {
      username: profile?.username,
      bio: profile?.bio || "chưa có bio",
      email: profile?.email,
      password: "*********",
    },
  });

  function onSubmit(values: EditProfileBodyType) {
    if (values.password === "*********") values.password = undefined;
    if (values.bio === "chưa có bio") values.bio = undefined;
    if (values.email === profile?.email) values.email = undefined;
    if (values.username === profile?.username) values.username = undefined;

    edit(values);
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="destructive">Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
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
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
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
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>bio</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EditProfile;
