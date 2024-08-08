import authApi from "@/apis/auth.api";
import { EditProfileBodyType } from "@/schemaValidations/auth.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useEditMe = () => {
  const queryClient = useQueryClient();
  const { mutate: edit } = useMutation({
    mutationFn: (body: EditProfileBodyType) => authApi.editMe(body),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Edit thành công");
    },
  });
  return { edit };
};
