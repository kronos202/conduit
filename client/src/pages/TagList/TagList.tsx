import Tag from "@/components/Tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppContext } from "@/context/app";
import { useTags } from "@/hooks/tags/queries/useTags";
import { Tags } from "@/lib/utils";
import { useContext } from "react";

const TagList = () => {
  const { tags } = useTags();
  const { setTag, tag } = useContext(AppContext);

  console.log(tag);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Tag</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-2">
        {tags?.data.data.map((tag: Tags) => (
          <Tag
            onClick={() => setTag(tag.name)}
            nameTag={tag.name}
            className="text-white bg-gray-600"
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default TagList;
