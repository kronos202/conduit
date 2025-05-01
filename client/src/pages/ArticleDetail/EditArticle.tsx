import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  UpdateArticleBody,
  UpdateArticleBodyType,
} from "@/schemaValidations/article.schema";
import { getArrayTagFromString, Tags } from "@/lib/utils";
import { useEditArticle } from "@/hooks/articles/mutations/useEditArticle";
import { useParams } from "react-router-dom";
import { useArticleSlug } from "@/hooks/articles/queries/useArticleSlug";

export function EditArticle() {
  const params = useParams();
  const { editArticle } = useEditArticle(params.slug as string);
  const { article } = useArticleSlug(params.slug as string);

  const form = useForm<UpdateArticleBodyType>({
    resolver: zodResolver(UpdateArticleBody),
    defaultValues: {
      title: article.title,
      description: article.description,
      content: article.content,
      tags: article.tags.map((name: Tags) => name.name),
    },
  });

  function onSubmit(values: UpdateArticleBodyType) {
    if (article.title === values.title) values.title = undefined;
    if (article.description === values.description)
      values.description = undefined;
    if (article.content === values.content) values.content = undefined;
    if (article.tags === values.tags) values.tags = undefined;

    editArticle(values);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-green-600 border-green-400 hover:bg-green-50">
          Edit Profile
        </Button>
      </DialogTrigger>
  
      <DialogContent className="sm:max-w-[500px] rounded-xl shadow-lg px-6 py-4 bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-600">Edit Profile</DialogTitle>
          <DialogDescription className="mt-1 text-sm text-gray-500">
            Update your profile information and save your changes.
          </DialogDescription>
        </DialogHeader>
  
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-5">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Title"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
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
                      placeholder="Short description"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
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
                      placeholder="Tell something about yourself..."
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-green-400"
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
                      placeholder="Tags (comma separated)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                      onChange={(e) => field.onChange(getArrayTagFromString(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <DialogFooter>
              <Button
                type="submit"
                className="w-full py-2 font-medium text-white transition bg-green-500 rounded-md hover:bg-green-600"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
  
  
}
