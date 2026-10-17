import { useForm } from "react-hook-form";
import {
  UseDeleteOneSkill,
  UseGetMeGuide,
  UseTourSkill,
  UseUpdateSkill,
} from "../hooks/UseUpdateSkill";

import SubmitSkill from "../components/SubmitSkill";

import { toast } from "sonner";
import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";

import ArichiveSkill from "@/components/ArichiveSkill";
import NewLoading from "@/components/loading/NewLoading";
import { FolderKanban } from "lucide-react";

export default function UpdateSkill() {
  const { register, handleSubmit } = useForm();
  const { data: CategoriesTour } = UseTourSkill();
  const { mutate: UpdateSkill, isPending } = UseUpdateSkill();
  const { data: Guide } = UseGetMeGuide();
  const { mutate: DeleteOneSkill, isPending: LoadDelete } = UseDeleteOneSkill();

  if (isPending || !CategoriesTour || !Guide || LoadDelete)
    return <NewLoading />;

  const { data } = CategoriesTour;
  const { skillGuide } = Guide;

  function submitValue(data) {
    const { skillGuide } = data;

    if (skillGuide?.length === 0 || !skillGuide)
      return toast.error("Anda Belum Memilih Skill Memandu", {
        description:
          "Silahkan Pilih Melalui Kotak Untuk Mencentang Masing Masing Skill Yang Relevan Dengan Anda",
      });

    console.log(skillGuide);

    UpdateSkill({ skillGuide });
  }
  const getActiveCategories = data.filter(
    (el) => !skillGuide?.includes(el._id),
  );

  const getIsAddeddCategory = data.filter((el) => skillGuide?.includes(el._id));

  function handleEdit(value) {
    const { _id } = value;

    DeleteOneSkill({ idSkillDelete: [_id] });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          <FolderKanban className="w-4 h-4 text-primary" />
          <span>Manajemen Skill</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Tambah Skill Memandu
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Silahkan Memilih Skill Memandu Anda , Dengan Mengclick Salah Satu Atau
          Lebih Kotak Dan Tekan Tambah Skill
        </p>
      </div>
      <form onSubmit={handleSubmit(submitValue)} className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
              <div className="flex items-center gap-10">
                <div className="flex items-center gap-3">
                  <span>Skill Belum Di Tambahkan</span>
                  <BadgeSimpleUse
                    variant={"default"}
                    desc={`${getActiveCategories?.length || 0} Skill`}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span>Skill Sudah Di Tambahkan</span>
                  <BadgeSimpleUse
                    variant={"default"}
                    desc={`${getIsAddeddCategory?.length || 0} Skill`}
                  />
                </div>
              </div>
            </h2>
            <SubmitSkill />
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
                        <BadgeSimpleUse
                          desc={"Belum Di Tambahkan"}
                          variant={"outline"}
                        />
                      </div>

                      <input
                        type="checkbox"
                        value={el._id}
                        {...register("skillGuide")}
                      />
                    </div>

                    <h3 className="font-semibold text-lg text-foreground tracking-tight line-clamp-1">
                      {categoriesTour}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1  ">
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {getIsAddeddCategory && getIsAddeddCategory.length > 0 && (
          <ArichiveSkill
            valueCategoriesArchive={getIsAddeddCategory}
            titleMain={"Kategori Skill Yang Dimiliki"}
            handleEdit={handleEdit}
            textBtn={"Hapus Skill Ini"}
            titlePopup={"Apakah Anda Yakin Ingin Membatalkan Skill "}
            descPopup={"Skill Ini Masih Bisa Anda Tambahkan Nanti"}
            badge={"Skill Aktif"}
            typeBtn={"button"}
          />
        )}
      </form>
    </div>
  );
}
