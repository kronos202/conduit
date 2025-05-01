import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppContext } from "@/context/app";
import { useTags } from "@/hooks/tags/queries/useTags";
import { Tags } from "@/lib/utils";
import { useContext } from "react";

const TagList = () => {
  const { tags } = useTags();
  const { setTag } = useContext(AppContext);

  return (
    <Card className="w-full max-w-md shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-700">Popular Tags</CardTitle>
      </CardHeader>
      <CardContent>
        {tags?.data?.data?.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {tags?.data.data.map((tag: Tags) => (
              <button
                key={tag.name}
                onClick={() => setTag(tag.name)}
                className="px-3 py-1 text-sm text-green-800 transition duration-150 ease-in-out bg-green-100 rounded-full hover:bg-green-200"
              >
                #{tag.name}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">Không có tag nào</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TagList;
