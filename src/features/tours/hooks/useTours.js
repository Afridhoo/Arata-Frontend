import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetTourHomePage,
  GetTours,
  GetToursById,
} from "../services/toursServices";
import { toast } from "sonner";

export function UseGetTours({ page, filter }) {
  return useQuery({
    queryKey: ["Tours", page, filter],
    queryFn: () => GetTours({ limit: page, filter }),
  });
}

export function UseGetOneTourById() {
  const query = useQueryClient();
  return useMutation({
    mutationFn: GetToursById,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["Tours"] });
    },
    onError: () => {
      toast.error("Gagal Mendapatkan Data Tour");
    },
  });
}

export function UseGetTourHomePage() {
  return useQuery({
    queryKey: ["ToursHomePage"],
    queryFn: GetTourHomePage,
  });
}
