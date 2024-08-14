import authApi from "@/apis/auth.api";
import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

export const useGetById = (userId: number) => {
  const { data } = useQuery({
    queryKey: queryKeys.getUserByUserId(userId),
    queryFn: () => authApi.getUserById(userId),
    select: (data) => data.data.data,
  });

  return { data };
};
