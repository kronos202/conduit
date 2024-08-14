import authApi from "@/apis/auth.api";
import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

export const useMe = () => {
  const { data } = useQuery({
    queryKey: queryKeys.me(),
    queryFn: () => authApi.me(),
    select: (data) => data.data.data,
  });

  return { data };
};
