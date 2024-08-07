import { cn } from "@/lib/utils";

const Tag = ({
  className,
  nameTag,
  onClick,
}: {
  className?: string;
  nameTag: string;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return (
    <div
      className={cn(
        "p-2 border border-gray-500 rounded-xl cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {nameTag}
    </div>
  );
};

export default Tag;
