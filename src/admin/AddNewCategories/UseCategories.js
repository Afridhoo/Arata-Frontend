import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteCategories,
  GetCategoris,
  PostCategories,
  UpdateCategories,
} from "./ServicesCategories";
import { toast } from "sonner";

export function UseGetCategories() {
  return useQuery({
    queryKey: ["Categories"],
    queryFn: GetCategoris,
  });
}

export function UsePostCategories() {
  const query = useQueryClient();

  return useMutation({
    mutationFn: PostCategories,

    onSuccess: () => {
      toast.success("Berhasil Menambahkan Kategori Baru", {
        description:
          "Kategori Yang Anda Tambahkan Berguna  Untuk Pemandu Memmilih Skill",
      });
      query.invalidateQueries({ queryKey: ["Categories"] });
    },

    onError: () => {
      toast.error("Gagal Menambahkan Kategori Baru", {
        description: "Silahkan Cek Koneksi Internet Anda",
      });
    },
  });
}

export function UseDeleteCategories() {
  const query = useQueryClient();
  return useMutation({
    mutationFn: DeleteCategories,

    onSuccess: () => {
      toast.success("Berhasil Menghapus Kategori");
      query.invalidateQueries({ queryKey: ["Categories"] });
    },

    onError: () => {
      toast.error("Gagal Menghapus Kategori ", {
        description: "Silahkan Cek Koneksi Internet Anda",
      });
    },
  });
}

export function UseUpdateCategories() {
  const query = useQueryClient();
  return useMutation({
    mutationFn: UpdateCategories,

    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["Categories"] });
      toast.success("Berhasil Mengupadte Kategori");
    },
    onError: () => {
      toast.error("Gagal Mengupdate Kategori ", {
        description: "Silahkan Cek Koneksi Internet Anda",
      });
    },
  });
}
