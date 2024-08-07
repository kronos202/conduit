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
import {
  CreateArticleBody,
  CreateArticleBodyType,
} from "@/schemaValidations/article.schema";
import { getArrayTagFromString } from "@/lib/utils";
import { useCreateArticle } from "@/hooks/articles/mutations/useCreateArticle";
import { LoadingSpinner } from "@/components/spinner";

const CreateArticle = () => {
  const { create, isPending } = useCreateArticle();

  const form = useForm<CreateArticleBodyType>({
    resolver: zodResolver(CreateArticleBody),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      tags: [""],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: CreateArticleBodyType) {
    create(values);
  }

  if (isPending) {
    return <LoadingSpinner />;
  }
  return (
    <div className="mx-auto w-[500px] bg-gray-50 p-5 rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="content" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="tags"
                    {...field}
                    onChange={(event) => {
                      field.value = getArrayTagFromString(event.target.value);
                      field.onChange(getArrayTagFromString(event.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateArticle;
