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
  console.log(article);

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
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
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
                        field.onChange(
                          getArrayTagFromString(event.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Edit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
