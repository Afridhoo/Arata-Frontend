import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetNotif,
  PatchNotif,
  SendCoords,
} from "../services/notificationServices";
import { toast } from "sonner";
export function UseGetNotif() {
 
  return useQuery({
    queryFn: GetNotif,
    retry: false,
  
    queryKey: ["Notification"],
  });
}

export function UsePatchNotif() {
  const query = useQueryClient();

  return useMutation({
    mutationFn: PatchNotif,

    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["Notification"] });
    },
  });
}

export function UseSendCoordsToAdmin() {
  const query = useQueryClient();

  return useMutation({
    mutationFn: SendCoords,
    onSuccess: () => {
      toast.success("Berhasil Mengirimkan Titik Kordinat Ke Admin");

      query.invalidateQueries({ queryKey: ["ToursActive"] });
      query.invalidateQueries({ queryKey: ["Notification"] });
    },
    onError: () => {
      toast.error("Gagal Mengirimkan Titik Kordinat Ke Admin");
    },
  });
}
