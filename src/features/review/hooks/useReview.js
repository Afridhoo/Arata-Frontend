import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateReview,
  DeleteReview,
  GetAllReview,
} from "../services/reviewServices";
import { toast } from "sonner";

export function UseGetAllReview() {
  return useQuery({
    queryKey: ["Review"],
    queryFn: GetAllReview,
  });
}

export function UseCreateReview(idDoc) {
  const query = useQueryClient();
  return useMutation({
    mutationFn: CreateReview,

    onSuccess: () => {
      toast.success("Berhasil Mengirimkan Review");

      query.invalidateQueries({ queryKey: ["documentationMe", idDoc] });
      query.invalidateQueries({ queryKey: ["Review"] });
      query.invalidateQueries({ queryKey: ["Booking"] });
      query.invalidateQueries({ queryKey: ["Tours"] });
      query.invalidateQueries({ queryKey: ["TripMe"] });
    },
    onError: () => {
      toast.error("Gagal Mengirimkan Review");
    },
  });
}

export function UseDeleteReview(idDoc) {
  const query = useQueryClient();
  return useMutation({
    mutationFn: DeleteReview,
    onSuccess: () => {
      toast.success("Berhasil Menghapus Review");

      query.invalidateQueries({ queryKey: ["Booking"] });
      query.invalidateQueries({ queryKey: ["Review"] });
      query.invalidateQueries({ queryKey: ["TripMe"] });
      query.invalidateQueries({ queryKey: ["Tours"] });
      query.invalidateQueries({ queryKey: ["documentationMe", idDoc] });
    },
    onError: () => {
      toast.error("Gagal Mengirimkan Review");
    },
  });
}
