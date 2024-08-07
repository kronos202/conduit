import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLogin() {
  return (
    <div className="flex flex-col items-center justify-center p-5 space-x-4 bg-gray-200">
      <div className="space-y-8">
        <Skeleton className="h-[60px] w-[250px] rounded-xl" />
        <Skeleton className="h-9 w-[250px]" />
        <Skeleton className="h-9 w-[250px]" />
        <div className="flex justify-center w-full">
          <Skeleton className="h-7 w-[100px] " />
        </div>
      </div>
    </div>
  );
}
