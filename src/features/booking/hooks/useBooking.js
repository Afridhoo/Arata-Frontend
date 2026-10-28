import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookingMe,
  CancelBooking,
  GetBookingById,
  InsertBooking,
} from "../../booking/services/bookingServices";

import { toast } from "sonner";

export function UseInsertBooking() {
  const query = useQueryClient();

  return useMutation({
    mutationFn: InsertBooking,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["Booking"] });
      toast.success("Berhasil Booking");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
}

export function UseGetBookingMe({ enabled }) {
  return useQuery({
    queryKey: ["Booking"],
    queryFn: BookingMe,
    retry: false,
    enabled: enabled,
  });
}

export function UseGetBookingById() {
  const query = useQueryClient();

  return useMutation({
    mutationFn: GetBookingById,

    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["Booking"] });
    },
    onError: (error) => {
      toast.error("Error", {
        description: error.response.data.message,
      });
    },
  });
}

export function UseCancelBooking() {
  const query = useQueryClient();

  return useMutation({
    mutationFn: CancelBooking,

    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["Booking"] });
      toast.success("Berhasil Membatalkan Booking");
    },
    onError: (err) => {
      toast.error("Gagal Membatalkan Booking", {
        description: err.response.data.message,
      });
    },
  });
}
