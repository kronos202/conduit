import followApi from "@/apis/follow.api";
import { useQuery } from "@tanstack/react-query";

export const useGetFollowers = (id: number) => {
  const { data: follower } = useQuery({
    queryKey: ["get-follower", id],
    queryFn: () => followApi.getFollower(id),
    select: (data) => data.data.data,
    enabled: !!id,
  });

  return { follower };
};
