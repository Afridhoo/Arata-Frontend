import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DeleteDocumentation,
  UpdateDocumentation,
  UpdateUserBooking,
} from "../services/UpdateTourGuideServices";

import { toast } from "sonner";

export function UseUpdateUserBooking() {
  const query = useQueryClient();
  return useMutation({
    mutationFn: UpdateUserBooking,

    onSuccess: () => {
      toast.success("Berhasil Mengabsen User", {
        description: "Anda Masih Bisa Mengedit Kehadiran User",
      });
      query.invalidateQueries({ queryKey: ["ToursGuide"] });
    },
    onError: () => {
      toast.error("Gagal Mengabsen User", {
        description: "Silahkan Cek Koneksi Internet Anda",
      });
    },
  });
}

export function UseUpdateDocumentation() {
  const query = useQueryClient();
  return useMutation({
    mutationFn: UpdateDocumentation,
    onSuccess: () => {
      toast.success("Berhasil Mengupdate Dokumentasi", {
        description: "Dokumentasi Yang Anda Update Masih Bisa Di Edit ",
      });

      query.invalidateQueries({ queryKey: ["ToursGuide"] });
      query.invalidateQueries({ queryKey: ["ToursHomePage"] });
      query.invalidateQueries({ queryKey: ["TripMe"] });
    },
    onError: (err) => {
      toast.error("Gagal Menghapus Dokumentasi", {
        description: err.response.data.message,
      });
    },
  });
}

export function UseDeletDocumentation() {
  const query = useQueryClient();

  return useMutation({
    mutationFn: DeleteDocumentation,

    onSuccess: () => {
      toast.success("Berhasil Menghapus Dokumentasi");

      query.invalidateQueries({ queryKey: ["ToursGuide"] });
      query.invalidateQueries({ queryKey: ["TripMe"] });
    },

    onError: (err) => {
      toast.error("Gagal Menghapus Dokumentasi", {
        description: err.response.data.message,
      });
    },
  });
}
