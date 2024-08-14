import authApi from "@/apis/auth.api";
import { queryKeys } from "@/constants/queryKey";
import { AppContext } from "@/context/app";
import { setProfileToLS } from "@/lib/auth";
import { EditProfileBodyType } from "@/schemaValidations/auth.schema";
import { User } from "@/types/user.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "react-toastify";

export const useEditMe = () => {
  const queryClient = useQueryClient();
  const { setProfile } = useContext(AppContext);

  const { mutate: edit, isSuccess } = useMutation({
    mutationFn: (body: EditProfileBodyType) => authApi.editMe(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.me() });
      toast.success("Edit thành công");
      console.log(data.data.data);

      setProfileToLS(data?.data.data as User);
      setProfile(data?.data.data as User);
    },
    onError: () => {
      toast.error("Edit thất bại");
    },
  });
  return { edit, isSuccess };
};
