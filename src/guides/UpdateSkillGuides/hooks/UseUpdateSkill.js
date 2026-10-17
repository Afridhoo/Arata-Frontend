import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteOneSkill,
  GetMeGuide,
  TourSkill,
  UpdateSkil,
} from "../services/UpdateSkillGuideServices";
import { toast } from "sonner";

export function UseTourSkill() {
  return useQuery({
    queryKey: ["ToursCategories"],
    queryFn: TourSkill,
  });
}

export function UseUpdateSkill() {
  const query = useQueryClient();
  return useMutation({
    mutationFn: UpdateSkil,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["ToursCategories"] });
      query.invalidateQueries({ queryKey: ["MeGuide"] });
      toast.success("Berhasil Menambah Skill Memandu Baru");
    },
    onError: () => {
      toast.error("Gagal Mengupdate Skill", {
        description: "Silahkan Cek Koneksi Internet Anda",
      });
    },
  });
}

export function UseDeleteOneSkill() {
  const query = useQueryClient();
  return useMutation({
    mutationFn: DeleteOneSkill,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["ToursCategories"] });
      query.invalidateQueries({ queryKey: ["MeGuide"] });
      toast.success("Berhasil Menghapus Skill Memandu ");
    },
    onError: () => {
      toast.error("Gagal Menghapus Skill Memandu", {
        description: "Silahkan Cek Koneksi Internet Anda",
      });
    },
  });
}

export function UseGetMeGuide() {
  return useQuery({
    queryKey: ["MeGuide"],
    queryFn: GetMeGuide,
  });
}


