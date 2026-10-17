import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetAllBooking,
  GetStatsBooking,
  UpdateBooking,
} from "../services/bookingServicesAdmin";
import { toast } from "sonner";

export function UseUpdateBooking() {
  const query = useQueryClient();

  return useMutation({
    mutationFn: UpdateBooking,

    onSuccess: () => {
      toast.success("Berhasil Mengupdate Booking User");
      query.invalidateQueries({ queryKey: ["Booking"] });
      query.invalidateQueries({ queryKey: ["AdminBooking"] });
      query.invalidateQueries({ queryKey: ["Tours"] });
    },
    onError: (error) => {
      toast.error("Gagal Mengupdate Booking", {
        description: error.response.data.message,
      });
    },
  });
}

export function UseGetAllBooking({ page, filter }) {
  return useQuery({
    queryKey: ["AdminBooking", page, filter],
    queryFn: () => GetAllBooking({ page, filter }),
  });
}

export function UseGetStatsBooking() {
  return useQuery({
    queryKey: ["AdminStatsBooking"],
    queryFn: GetStatsBooking,
  });
}
