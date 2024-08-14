import followApi from "@/apis/follow.api";
import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

export const useGetFollowing = (id: number) => {
  const { data: following } = useQuery({
    queryKey: queryKeys.getFollowing(id),
    queryFn: () => followApi.getFollowing(id),
    select: (data) => data.data.data,
    enabled: !!id,
  });

  return { following };
};
