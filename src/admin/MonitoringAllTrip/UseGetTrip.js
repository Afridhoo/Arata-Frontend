import { useMutation, useQuery } from "@tanstack/react-query";
import { GetLineRoad, getTrip, postReqLocation } from "./ServicesGetTrip";
import { toast } from "sonner";

export function UseGetTrip() {
  return useQuery({
    queryKey: ["ToursActive"],
    queryFn: getTrip,
  });
}

export function UsePostReqLocations() {
  return useMutation({
    mutationFn: postReqLocation,

    onSuccess: () => {
      toast.success("Berhasil Mengirimkan Notifikasi Ke Guide ");
    },
    onError: () => {
      toast.error("Gagal Mengirimkan Notifikasi Ke Guide ");
    },
  });
}

export function UseGetLineRoad() {
  return useMutation({
    mutationFn: GetLineRoad,

    onError: () => {
      toast.error("Gagal Mendapatkan Lokasi Line");
      


    },
  });
}
