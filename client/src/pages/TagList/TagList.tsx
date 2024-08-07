import Tag from "@/components/Tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {};

const TagList = (props: Props) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Tag</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        <Tag nameTag="test" className="text-white bg-gray-600" />
        <Tag nameTag="test" className="text-white bg-gray-600" />
        <Tag nameTag="test" className="text-white bg-gray-600" />
        <Tag nameTag="test" className="text-white bg-gray-600" />
      </CardContent>
    </Card>
  );
};

export default TagList;
