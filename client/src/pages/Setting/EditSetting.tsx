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
import { Textarea } from "@/components/ui/textarea";

const EditProfile = () => {
  const { edit } = useEditMe();
  const { profile } = useContext(AppContext);

  const form = useForm<EditProfileBodyType>({
    resolver: zodResolver(EditProfileBody),
    defaultValues: {
      username: profile?.username,
      bio: profile?.bio || "",
      email: profile?.email,
      password: "*********",
    },
  });

  const onSubmit = (values: EditProfileBodyType) => {
    const updated: Partial<EditProfileBodyType> = {};
    if (values.username !== profile?.username) updated.username = values.username;
    if (values.email !== profile?.email) updated.email = values.email;
    if (values.password !== "*********") updated.password = values.password;
    if (values.bio && values.bio !== profile?.bio) updated.bio = values.bio;

    edit(updated);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="destructive" className="font-semibold rounded-md">
          Edit Profile
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="max-w-md">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-green-600">Edit Profile</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="New password (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us something about you..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer */}
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" className="w-full text-white bg-green-500 hover:bg-green-600">
                  Save Changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};


export default EditProfile;
