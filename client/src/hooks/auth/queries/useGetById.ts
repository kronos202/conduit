import authApi from "@/apis/auth.api";
import { useQuery } from "@tanstack/react-query";

export const useGetById = (userId: number) => {
  const { data } = useQuery({
    queryKey: ["get-user-by-user-id", userId],
    queryFn: () => authApi.getUserById(userId),
    select: (data) => data.data.data,
  });

  return { data };
};
