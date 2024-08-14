import followApi from "@/apis/follow.api";
import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

export const useGetFollowers = (id: number) => {
  const { data: follower } = useQuery({
    queryKey: queryKeys.getFollower(id),
    queryFn: () => followApi.getFollower(id),
    select: (data) => data.data.data,
    enabled: !!id,
  });

  return { follower };
};
