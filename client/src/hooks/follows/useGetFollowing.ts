import followApi from "@/apis/follow.api";
import { useQuery } from "@tanstack/react-query";

export const useGetFollowing = (id: number) => {
  const { data: following } = useQuery({
    queryKey: ["get-following", id],
    queryFn: () => followApi.getFollowing(id),
    select: (data) => data.data.data,
    enabled: !!id,
  });

  return { following };
};
