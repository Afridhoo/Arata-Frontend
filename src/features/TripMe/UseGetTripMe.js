import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteReviewGuide,
  GetTripMe,
  PostReviewGuide,
} from "./ServicesGetTripMe";
import { toast } from "sonner";

export function UseGetTripMe({ enabled }) {
  return useQuery({
    queryKey: ["TripMe"],
    queryFn: GetTripMe,
    retry: false,
    enabled: enabled,
  });
}

export function UsePostReviewGuide(idDoc) {
  const query = useQueryClient();

  return useMutation({
    mutationFn: PostReviewGuide,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["TripMe"] });
      query.invalidateQueries({ queryKey: ["Tours"] });
      query.invalidateQueries({ queryKey: ["documentationMe", idDoc] });

      toast.success("Berhasil", {
        description: "Mengirimkan Review Pemandu , Data Anda Kami Privasi",
      });
    },
    onError: () => {
      toast.error("Berhasil", {
        description: "Mengirimkan Review Pemandu , Data Anda Kami Privasi",
      });
    },
  });
}

export function UseDeleteReviewGuide(idDoc) {
  const query = useQueryClient();

  return useMutation({
    mutationFn: DeleteReviewGuide,

    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["TripMe"] });
      query.invalidateQueries({ queryKey: ["documentationMe", idDoc] });
      query.invalidateQueries({ queryKey: ["Tours"] });

      toast.success("Berhasil", {
        description: "Menghapus Review Pemandu",
      });
    },
    onError: () => {
      toast.error("Gagal", {
        description: "Menghapus Review Pemandu",
      });
    },
  });
}
