import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GuideTour,
  ToursBooking,
  UpdateDateTour,
} from "../services/dateServicesAdmin";
import { toast } from "sonner";

export function UseGetToursBooking({ page, filter }) {
  return useQuery({
    queryKey: ["ToursDate", page, filter],
    queryFn: () => ToursBooking({ page, filter }),
  });
}

export function UseUpdateDateTour() {
  const query = useQueryClient();
  return useMutation({
    mutationFn: UpdateDateTour,
    onSuccess: () => {
      toast.success("Berhasil Update Tour & Guide", {
        description: "Tanggal Dan Pemandu Masih Bisa Di Edit",
      });
      query.invalidateQueries({ queryKey: ["Tours"] });
      query.invalidateQueries({ queryKey: ["ToursDate"] });
      query.invalidateQueries({ queryKey: ["ToursGuide"] });
      query.invalidateQueries({ queryKey: ["TripMe"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
}

export function UseGetGuideTour() {
  return useMutation({
    mutationFn: GuideTour,
    onError: () => {
      toast.error("Gagal Mendapatkan Guide");
    },
  });
}
