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
    <div className="w-full max-w-md p-6 mx-auto mt-10 bg-white shadow-lg sm:p-8 rounded-xl">
    <h2 className="mb-6 text-2xl font-bold text-center text-green-500">Create New Article</h2>
  
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter article title"
                  className="p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  
        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Write a short description"
                  className="p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  
        {/* Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <textarea
                  rows={5}
                  placeholder="Write your article (supports markdown)"
                  className="w-full p-4 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-green-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  
        {/* Tags */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter tags separated by comma (e.g. tech, react)"
                  className="p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                  onChange={(event) => {
                    const value = event.target.value;
                    const array = getArrayTagFromString(value);
                    field.onChange(array);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  
        {/* Submit */}
        <Button
          type="submit"
          className="w-full py-2 font-medium text-white transition bg-green-500 rounded-md hover:bg-green-600"
        >
          Create Article
        </Button>
      </form>
    </Form>
  </div>
  
  );
};

export default CreateArticle;
