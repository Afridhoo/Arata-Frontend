import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDestinationHandle,
  GetGuideTour,
  GetSameGuide,
  UpdateDestinationHandle,
} from "../services/GetTourGuideServices";

import { toast } from "sonner";

export function UseGetTourGuide() {
  return useQuery({
    queryKey: ["ToursGuide"],
    queryFn: GetGuideTour,
  });
}

export function UseGetDestinationHandle() {
  return useMutation({
    mutationFn: getDestinationHandle,

    onError: () => {
      toast.error("Gagal", { description: "Gagal Mengupdate Dokumentasi" });
    },
  });
}

export function UseUpdateDestinationHandle() {
  const query = useQueryClient();
  return useMutation({
    mutationFn: UpdateDestinationHandle,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["ToursGuide"] });
      toast.success("Berhasil Update Status", {
        description: "Dokumentasi Perjalanan Berhasil DiUpdate",
      });
    },
    onError: (err) => {
      toast.error("Gagal Menghapus Dokumentasi", {
        description: err.response.data.message,
      });
    },
  });
}

export function UseGetSameGuide() {
  return useMutation({
    mutationFn: GetSameGuide,

    onError: () => {
      toast.error("Gagal Mendapatakan Info Guide", {
        description: "Silahkan Cek Koneksi Internet Anda",
      });
    },
  });
}
