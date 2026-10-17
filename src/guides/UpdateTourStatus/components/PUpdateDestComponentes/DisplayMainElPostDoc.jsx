import { IoLocation } from "react-icons/io5";
import FileImgUpload from "./FileImgUpload";
import Note from "./Note";
import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import { DialogUseSubmit } from "@/components/DialogUseSubmit";

export default function DisplayMainElPostDoc({ register, value, formId }) {
  const { _id, image, description, address, getIsValidCategories } =
    value.handleUpdate;

  const { categoriesTour: categoryLoc, description: descLoc } =
    getIsValidCategories;

  return (
    <div>
      <label className="flex mt-2 text-xs font-bold uppercase tracking-wider text-gray-800 items-center gap-1.5">
        <IoLocation className="h-4 w-4" />
        Daftar Lokasi & Dokumentasi Per Destinasi
      </label>
      <div className="space-y-4">
        <div key={_id}>
          {/* Destination Top Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-slate-100 bg-gray-50/10">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {image && (
                <img
                  src={image}
                  className="w-16 h-16 rounded-xl object-cover border border-gray-100 shadow-sm shrink-0"
                />
              )}
              <div className="flex  items-start gap-5">
                <div className="max-w-[200px]">
                  <span className="text-sm font-bold text-gray-950 truncate block">
                    {description || "Lokasi Wisata"}
                  </span>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {address || "Tidak ada deskripsi lokasi."}
                  </p>
                </div>
                <div className="max-w-[300px] ">
                  <span className="text-sm font-bold text-gray-950 truncate block">
                    Kategori :{categoryLoc || "Lokasi Wisata"}
                  </span>

                  <p className="text-xs text-gray-500 mt-1  font-semibold">
                    {descLoc || "Tidak ada deskripsi lokasi."}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Dropdown Option */}
            <div className="w-full  max-w-[150px]">
              <div className="relative">
                <select
                  {...register(`destinations.status`)}
                  className="w-full rounded-xl border  bg-white pl-4 pr-10 py-2.5 text-xs text-gray-700 font-semibold  cursor-pointer"
                >
                  <option value="ongoing">ONGOING</option>
                  <option value="finished">FINISHED</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white grid grid-cols-2 gap-4">
            <Note register={register(`destinations.note`)} />

            <div className="space-y-1.5">
              <FileImgUpload
                register={register(`destinations.imageDocumentation`)}
              />
            </div>
          </div>

          <div className="p-2 flex items-center justify-end">
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
