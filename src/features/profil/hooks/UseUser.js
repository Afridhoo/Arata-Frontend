import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetStatsMe, UpdateProfil } from "../services/ProfilServices";
import { toast } from "sonner";

export function UseGetStatsMe({ enabled }) {
  return useQuery({
    queryKey: ["StatsUser"],
    queryFn: GetStatsMe,
    enabled: enabled,
    retry: false,
  });
}

export function UseUpdateProfil() {
  const query = useQueryClient();

  return useMutation({
    mutationFn: UpdateProfil,

    onSuccess: () => {
      toast.success("Berhasil Memperbarui Profil");
      query.invalidateQueries({ queryKey: ["User"] });
    },
    onError: () => {
      toast.error("Gagal Memperbarui Profil");
    },
  });
}
