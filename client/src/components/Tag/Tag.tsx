import { cn } from "@/lib/utils";

const Tag = ({
  className,
  nameTag,
}: {
  className?: string;
  nameTag: string;
}) => {
  return (
    <div
      className={cn(
        "p-2 border border-gray-500 rounded-xl cursor-pointer",
        className
      )}
    >
      {nameTag}
    </div>
  );
};

export default Tag;
