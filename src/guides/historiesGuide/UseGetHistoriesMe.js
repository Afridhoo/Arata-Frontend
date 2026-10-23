import { useQuery } from "@tanstack/react-query";
import { GetHistoriesMe, GetHistoriesMeId } from "./HistoriesMeServices";

export function UseGetHistoriesMe() {
  return useQuery({
    queryKey: ["HistoriesMe"],
    queryFn: GetHistoriesMe,
  });
}

export function UseGetHistoriesMeId({ id }) {
  return useQuery({
    queryKey: ["Histories", id],
    queryFn: () => GetHistoriesMeId({ id }),
  });
}
