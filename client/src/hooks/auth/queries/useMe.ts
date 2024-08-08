import authApi from "@/apis/auth.api";
import { useQuery } from "@tanstack/react-query";

export const useMe = () => {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: () => authApi.me(),
  });

  return { data };
};
