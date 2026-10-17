import {
  UseDeleteCategories,
  UseGetCategories,
  UsePostCategories,
  UseUpdateCategories,
} from "./UseCategories";

import {
  LucideCircleSlash2,
  Tag,
  FolderKanban,
  Archive,
  LucideCheck,
  LucideTrash2,
} from "lucide-react";

import EmptyAndForm2fileds from "@/components/EmptyAndForm2fileds";
import NewLoading from "@/components/loading/NewLoading";
import { DialogForm2Fields } from "@/components/DialogForm2Fields";
import { DialogDelete } from "@/components/DialogDelete";

import { toast } from "sonner";
import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import ArichiveSkill from "@/components/ArichiveSkill";

export default function AddNewCategories() {
  const { data: Categories } = UseGetCategories();
  const { mutate: InsertCategories, isPending } = UsePostCategories();
  const { mutate: UpdateCategories, isPending: LoadUpdate } =
    UseUpdateCategories();
  const { mutate: InsertDelete, isPending: LoadDelete } = UseDeleteCategories();

  function handleSubmit(value) {
    const { typeCategories } = value;
    const isValidType = ["destination", "hotel"];

    if (!isValidType.includes(typeCategories.toLowerCase()))
      return toast.error(
        "Pastikan Anda Mengisi Tipe Kategori Dengan Nama Destination atau Hotel",
      );

    const finalFormat = {
      ...value,
      typeCategories: typeCategories?.toLowerCase(),
    };

    InsertCategories({ value: finalFormat });
  }

  if (isPending || !Categories || LoadUpdate || LoadDelete)
    return <NewLoading />;

  const fieldsForInput = [
    { name: "Jenis Kategori Baru", register: "categoriesTour", type: "text" },
    { name: "Deskripsi Kategori", register: "description", type: "text" },
    {
      name: "Tipe Kategori",
      register: "typeCategories",
      type: "text",
      placeholder: "Destination / Hotel",
    },
  ];

  if (Categories?.length === 0)
    return (
      <EmptyAndForm2fileds
        textRenderForm={"Buat Kategori"}
        titleEmpty={"Anda Belum Menambahkan Kategori Sama Sekali"}
        iconEmpty={<LucideCircleSlash2 />}
        descEmpty={
          "Silahkan Tambahkan Dulu , Agar Guide Bisa Menambah Skill Memandu"
        }
        handleSubmit={handleSubmit}
        descForm={
          "Tambahkan Kategori Baru Untuk Guide Memilih Skill Dan Juga Untuk Label Tour"
        }
        titleForm={"Tambah Kategori Baru"}
        fields={fieldsForInput}
      />
    );

  const valueCategories = Categories.value || [];

  function handleEdit(value) {
    const { _id } = value;
    const format = { ...value, status: "active" };

    UpdateCategories({ value: format, id: _id });
  }

  function handleDelete(id) {
    InsertDelete({ id });
  }

  const getActiveCategories = valueCategories?.filter(
    (el) => el.status !== "inactive",
  );
  const getNonActiveCategories = valueCategories?.filter(
    (el) => el.status === "inactive",
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            <FolderKanban className="w-4 h-4 text-primary" />
            <span>Manajemen Kategori</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Kategori Tour
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola kategori wisata untuk keahlian guide dan label pada paket
            tour.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DialogForm2Fields
            textRender={"Tambah Kategori Baru"}
            titleForm={"Tambah Kategori Baru"}
            descForm={`Silahkan Tambah Categori Atau Deskripsi`}
            handleSubmit={handleSubmit}
            fields={fieldsForInput}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
            <span>Kategori Aktif</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20">
              {getActiveCategories?.length || 0} Aktif
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {getActiveCategories?.map((el) => {
            const { categoriesTour, description, _id } = el;

            return (
              <div
                key={_id}
                className="bg-card hover:bg-card/90 text-card-foreground border border-border/60 shadow-xs hover:shadow-md transition-all duration-200 rounded-2xl p-5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <BadgeSimpleUse desc={"Aktif"} variant={"outline"} />
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg text-foreground tracking-tight line-clamp-1">
                    {categoriesTour}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-3 leading-relaxed min-h-[40px]">
                    {description || "Tidak ada deskripsi"}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-end gap-2">
                  <DialogForm2Fields
                    textRender={"Edit"}
                    titleForm={`Edit Kategori ${categoriesTour}`}
                    descForm={`Silahkan Edit Categori Atau Deskripsi`}
                    handleSubmit={handleEdit}
                    fields={[
                      {
                        name: `Edit Kategori ${categoriesTour}`,
                        register: "categoriesTour",
                        type: "text",
                        default: categoriesTour,
                      },
                      {
                        name: `Edit Deskripsi Kategori`,
                        register: "description",
                        type: "text",
                        default: description,
                      },
                      {
                        register: "_id",
                        type: "hidden",
                        default: _id,
                      },
                    ]}
                  />

                  <DialogDelete
                    text={"Hapus"}
                    title={`Apakah Anda Yakin Ingin Menghapus Kategori ${categoriesTour}`}
                    desc={`${categoriesTour} Ini Akan Terhapus Soft Anda Masih Bisa Mengaktifkannya Lagi Nanti`}
                    defaultCss={"p-2"}
                    defaultVariant={"outline"}
                    icon={<LucideTrash2 />}
                    onSubmit={() => handleDelete(_id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {getNonActiveCategories && getNonActiveCategories.length > 0 && (
        <ArichiveSkill
          valueCategoriesArchive={getNonActiveCategories}
          titleMain={"Kategori Non-Aktif / Arsip"}
          handleEdit={handleEdit}
          textBtn={"Aktifkan Kategori Ini"}
          titlePopup={"Apakah Anda Yakin Ingin Mengaktifkan Kategori Ini"}
          descPopup={
            "Kategori Ini Akan Muncul Di Halaman Pemandu Untuk Memilih Skill"
          }
          badge={"Tidak Aktif"}
        />

      )}
    </div>
  );
}
