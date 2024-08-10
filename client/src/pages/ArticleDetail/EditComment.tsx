import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateComment } from "@/hooks/comments/mutations/useUpdateComment";
import { FilePen } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function EditComment({
  commentId,
  contentD,
}: {
  commentId: number;
  contentD: string;
}) {
  const params = useParams();
  const [content, setContent] = useState<string>("");

  const { Update } = useUpdateComment(params.slug as string, content);

  const handleChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setContent(event.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FilePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Comment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Comment
            </Label>
            <Input
              id="name"
              defaultValue={contentD}
              className="col-span-3"
              onChange={handleChangeComment}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => Update(commentId)} type="submit">
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
