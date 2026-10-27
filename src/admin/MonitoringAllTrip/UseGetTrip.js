import { useMutation, useQuery } from "@tanstack/react-query";
import { GetLineRoad, getTrip } from "./ServicesGetTrip";
import { toast } from "sonner";

export function UseGetTrip() {
  return useQuery({
    queryKey: ["ToursActive"],
    queryFn: getTrip,
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
