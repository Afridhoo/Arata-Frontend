import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteLocationTour,
  DeleteTour,
  GetLocation,
  GetLocationDestination,
  GetLocationLatlng,
  GetStatsTour,
  InsertTour,
  UpdateTour,
} from "../services/tourServicesAdmin";

import { toastSucsess } from "@/components/UseToastSimple";
import { toast } from "sonner";

export function UseGetStatsTour() {
  return useQuery({
    queryKey: ["ToursStatsAdmin"],
    queryFn: GetStatsTour,
  });
}

export function UseGetUpdateTour() {
  const query = useQueryClient();

  return useMutation({
    mutationFn: UpdateTour,

    onSuccess: () => {
      toast.success("Berhasil Mengupdate Tour");

      query.invalidateQueries({ queryKey: ["Tours"] });
      query.invalidateQueries({ queryKey: ["ToursStatsAdmin"] });
      query.invalidateQueries({ queryKey: ["TripMe"] });
      query.invalidateQueries({ queryKey: ["ToursActive"] });
    },

    onError: () => {
      toast.error("Gagal Mengupdate Tour");
    },
  });
}

export function UseGetLocation() {
  return useMutation({
    mutationFn: GetLocation,

    onError: () => {
      toast.error("Lokasi Tidak DiTemukan", {
        description:
          "Silahkan Cari Lokasi Lain , Data Dari Lokasi Ini Tidak Tersedia",
      });
    },
  });
}

export function UseGetLocationLatlng() {
  return useMutation({
    mutationFn: GetLocationLatlng,

    onError: () => {
      toast.error("Lokasi Tidak DiTemukan", {
        description:
          "Silahkan Cari Lokasi Lain , Data Dari Lokasi Ini Tidak Tersedia",
      });
    },
  });
}

export function UseGetLocationDestination() {
  return useMutation({
    mutationFn: GetLocationDestination,

    onError: () => {
      toast.error("Lokasi Tidak DiTemukan", {
        description:
          "Silahkan Cari Lokasi Lain , Data Dari Lokasi Ini Tidak Tersedia",
      });
    },
  });
}

export function UseInsertTour() {
  const query = useQueryClient();
  return useMutation({
    mutationFn: InsertTour,

    onSuccess: () => {
      toast.success("Berhasil Menambah Lokasi Tour Baru");

      query.invalidateQueries({ queryKey: ["Tours"] });
      query.invalidateQueries({ queryKey: ["ToursStatsAdmin"] });
    },

    onError: () => {
      toast.error("Gagal Menambah Lokasi Tour Baru");
    },
  });
}

export function UseDeleteLocationTour() {
  const query = useQueryClient();
  return useMutation({
    mutationFn: DeleteLocationTour,

    onSuccess: (_, state) => {
      toast.success("Berhasil Menghapus Lokasi Tour");

      query.invalidateQueries({ queryKey: ["Tours"] });
      query.invalidateQueries({ queryKey: ["ToursStatsAdmin"] });
      state.setConcatValue((concatValue) =>
        concatValue.filter((el) => el.id !== state.idLocation),
      );
    },

    onError: () => {
      toast.error("Gagal Menghapus Lokasi Tour");
    },
  });
}

export function UseDeleteTour() {
  const query = useQueryClient();

  return useMutation({
    mutationFn: DeleteTour,

    onSuccess: () => {
      toast.success("Berhasil Menghapus Data Tour");
      toastSucsess({ message: "Menghapus Tour", title: "Berhasil" });

      query.invalidateQueries({ queryKey: ["Tours"] });
      query.invalidateQueries({ queryKey: ["ToursStatsAdmin"] });
    },

    onError: () => {
      toast.error("Gagal Menghapus Data Tour");
    },
  });
}
