import { IoLocation } from "react-icons/io5";
import FileImgUpload from "./FileImgUpload";
import Note from "./Note";
import { DialogUseSubmit } from "@/components/DialogUseSubmit";
import { Field, FieldLabel } from "@/components/ui/field";

export default function DisplayMainElPostDoc({ register, value, formId }) {
  const { _id, image, description, address, getIsValidCategories } =
    value.handleUpdate;

  const { categoriesTour: categoryLoc, description: descLoc } =
    getIsValidCategories;

  return (
    <div className="max-w-full bg-white rounded-4xl  p-5 pt-2">
      <label className="flex  flex-wrap mt-2 md:mt-7 text-xs font-bold uppercase tracking-wider text-gray-800 items-center gap-1.5">
        <IoLocation className="h-4 w-4" />
        Daftar Lokasi & Dokumentasi Per Wisata
      </label>
      <div className="space-y-4">
        <div key={_id}>
          <div className="flex flex-wrap justify-between gap-4 pt-4 md:p-4 border-b border-slate-100 bg-gray-50/10">
            <div className="flex flex-wrap  items-center gap-2 md:gap-4 ">
              {image && (
                <img
                  src={image}
                  className="w-16 h-16 rounded-xl object-cover border border-gray-100 shadow-sm shrink-0"
                />
              )}
              <div className="flex  flex-wrap items-start gap-1 md:gap-5">
                <div className="max-w-[200px]">
                  <span className="text-sm font-bold text-gray-950 truncate block">
                    {description || "Lokasi Wisata"}
                  </span>
                  <p className=" hidden md:flex text-xs text-slate-500 mt-1 line-clamp-2">
                    {address || "Tidak ada deskripsi lokasi."}
                  </p>
                </div>
                <div className="max-w-[300px] ">
                  <span className="text-sm  md:font-bold text-gray-950 truncate block">
                    Kategori :{categoryLoc || "Lokasi Wisata"}
                  </span>

                  <p className=" hidden md:flex text-xs text-gray-500 mt-1  font-semibold">
                    {descLoc || "Tidak ada deskripsi lokasi."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4  flex flex-wrap  gap-4  rounded-2xl ">
            <div className="w-fit">
              <Note register={register(`destinations.note`)} />
            </div>

            <div className="space-y-1.5">
              <FileImgUpload
                register={register(`destinations.imageDocumentation`)}
              />
            </div>

            <div className="w-full max-w-[90px]   md:max-w-[150px]">
              <Field>
                <FieldLabel>Status Wisata</FieldLabel>
                <select
                  {...register(`destinations.status`)}
                  className="md:w-full w-fit rounded-xl border  bg-white md:pl-4 md:pr-10 py-2.5 text-xs text-gray-700 font-semibold  cursor-pointer"
                >
                  <option value="ongoing">ONGOING</option>
                  <option value="finished">FINISHED</option>
                </select>
              </Field>
            </div>
          </div>
          <div className="p-2 flex flex-wrap items-center justify-end">
            <DialogUseSubmit
              typeBtn={"submit"}
              formId={formId}
              textBtn={"Tambah Dokumentasi"}
              title={"Apakah Anda Yakin Ingin Mengirimkan Dokumentasi Ini ?"}
              desc={
                "Dokumentasi Yang Anda Tambahkan Akan Muncul Di Akun User Juga , Anda Masih Bisa Mengedit Nya Nanti"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
