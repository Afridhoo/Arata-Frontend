import { useMutation, useQuery } from "@tanstack/react-query";
import { searchUser, UpdateRoleUser } from "./AddNewGuideServices";
import { toast } from "sonner";

export function UseSearchUser({ page, filter }) {
  return useQuery({
    queryKey: ["searchUser", page, filter],
    queryFn: () => searchUser({ page, filter }),
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
