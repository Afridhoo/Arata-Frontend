import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateFavorite } from "./ServicesFavorit";

import { toast } from "sonner";

export function UseCreateFavorite() {
  const query = useQueryClient();
  return useMutation({
    mutationFn: CreateFavorite,

    onSuccess: (data) => {
      toast.success(`${data} Ke Favorite`);

      query.invalidateQueries({ queryKey: ["Tours"] });
      query.invalidateQueries({ queryKey: ["ToursHomePage"] });
    },

    onError: () => {
      toast.error("Gagal Menambahkan Ke Favorite");
    },
  });
}
