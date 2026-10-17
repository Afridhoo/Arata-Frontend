import { useMutation, useQuery } from "@tanstack/react-query";
import { GetHistoriesMe, GetHistoriesMeId } from "./HistoriesMeServices";
import { toastError } from "@/components/UseToastSimple";

export function UseGetHistoriesMe() {
  return useQuery({
    queryKey: ["HistoriesMe"],
    queryFn: GetHistoriesMe,
  });
}

export function UseGetHistoriesMeId() {
  return useMutation({
    mutationFn: GetHistoriesMeId,

    onError: () => {
      toastError({ title: "Gagal Mendapatkan Data" });
    },
  });
}
