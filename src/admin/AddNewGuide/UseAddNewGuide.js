import { useMutation } from "@tanstack/react-query";
import { searchUser, UpdateRoleUser } from "./AddNewGuideServices";
import { toast } from "sonner";


export function UseSearchUser() {
  return useMutation({
    mutationFn: searchUser,

    onError: () => {

      toast.error("User Tidak Ditemukan");
    },
  });
}

export function UseUpdateRoleUser() {
  return useMutation({
    mutationFn: UpdateRoleUser,
    onSuccess: () => {
      toast.success("Berhasil Mengupdate Role User");
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
}
