import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { searchUser, UpdateRoleUser } from "./AddNewGuideServices";
import { toast } from "sonner";

export function UseSearchUser({ page, filter }) {
  return useQuery({
    queryKey: ["searchUser", page, filter],
    queryFn: () => searchUser({ page, filter }),
  });
}

export function UseUpdateRoleUser() {
  const query = useQueryClient();

  return useMutation({
    mutationFn: UpdateRoleUser,
    onSuccess: () => {
      toast.success("Berhasil Mengupdate Role User");
      query.invalidateQueries({ queryKey: ["searchUser"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
}
