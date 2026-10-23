import { IoImage } from "react-icons/io5";
import { formatDateId } from "../../../../utils/convertDate";
import FileImgUpload from "./FileImgUpload";
import Note from "./Note";
import WatchUploadImg from "./WatchUploadImg";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LucideCloudUpload,
  LucideDelete,
  LucidePenBox,
  LucidePlus,
} from "lucide-react";
import { toast } from "sonner";
import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import { DialogDelete } from "@/components/DialogDelete";

export default function Documentation({
  documentation,
  handleImgView,
  handleSubmitUpdate,
  id,
  documentationId,
  handleDeleteDocumentation,
  statusHandle,
}) {
  const { handleSubmit, register, watch, resetField } = useForm({
    defaultValues: {
      documentation: documentation?.map?.((el) => ({
        idDoc: el._id,
        note: el.note,
        statusHandle: el.statusHandle,
        images: [],
        groupLocation: el.groupLocation,
        destinationLocation: el.destinationLocation,
      })),
    },
  });

  const { _id: idDestination } = id;
  const checkIsFinish = statusHandle === "finished";
  const checkLengthDocOld = documentation?.length === 1;

  const getWatch = watch("documentation");
  const uploadImgFinish = watch("newAdd");

  const [isActiveUpdate, setIsActiveUpdate] = useState(null);
  const [isActiveAddImg, setIsActiveAddImg] = useState(0);

  const getUpload = getWatch.map((el) => el?.images);
  const getImgOld = documentation?.map((el) => el.images);

  function handleUpdateDoc(data) {
    const formData = new FormData();

    const doc = data?.documentation;
    const getDocUpdate = doc.find((el) => el.idDoc === isActiveUpdate);
    const getDocUpdateIdx = doc.findIndex((el) => el.idDoc === isActiveUpdate);

    const { note, statusHandle, idDoc, destinationLocation, groupLocation } =
      getDocUpdate;

    if (uploadImgFinish) {
      if (uploadImgFinish[getDocUpdateIdx]?.images?.length > 5)
        return toast.error("Maksimal 5 Gambar", {
          description: `Anda Mengupload ${uploadImgFinish[getDocUpdateIdx]?.images?.length} Gambar , Pastikan Anda Hanya Mengupload 5 Gambar`,
        });
    }

    const finalFormat = {
      documentationId,
      idTrip: idDoc,
      trip: [
        {
          destination: idDestination,
          statusHandle,
          note,
          groupLocation,
          destinationLocation,
        },
      ],
    };

    const isValidUpdate = isActiveAddImg
      ? [
          ...(uploadImgFinish[getDocUpdateIdx]?.images || []),
          ...(getUpload[getDocUpdateIdx]?.flatMap((e) => e[0]) || []),
        ]
      : getUpload[getDocUpdateIdx]?.flatMap((e) => e[0]);

    const isValidImgOld = isActiveAddImg
      ? [
          ...(uploadImgFinish[getDocUpdateIdx]?.images || []),
          ...(getImgOld[getDocUpdateIdx] || []),
        ]
      : getImgOld[getDocUpdateIdx];

    const getUpdate = isValidUpdate.map((el, idx) =>
      el instanceof File ? el : isValidImgOld[idx],
    );

    

    const getNewImg = getUpdate.filter((el) => el instanceof File);
    const getOldImg = getUpdate.filter((el) => typeof el === "string");

    formData.append("dataFormat", JSON.stringify(finalFormat));
    formData.append("oldImage", JSON.stringify(getOldImg));
    getNewImg.forEach((el) => formData.append("imageDocumentation", el));

    handleSubmitUpdate(formData);
  }

  function handleDeleteDoc(id) {
    const format = { idTrip: id, documentationId, idDestination };
    handleDeleteDocumentation(format);
  }

  function handleAddPhoto() {
    setIsActiveAddImg(1);
    toast.info("Maksimal Upload Gambar 5 Foto", {
      description: "Jika Lebih Dari 5 Silahkan Upload Secara Berkala",
    });
  }

  function handleEditDoc(id) {
    const idx = documentation.findIndex((el) => el._id === id);

    resetField(`documentation.${idx}.images`);
    resetField(`newAdd.${idx}.images`);

    if (isActiveUpdate === id) {
      setIsActiveUpdate("");
      setIsActiveAddImg(0);
      toast.success("Update Di Batalkan");
    } else {
      setIsActiveAddImg(0);
      setIsActiveUpdate(id);

      toast.success("Klick Dua Kali Icon Pensil Untuk Batal Update");
    }
  }

  return (
    <div className="space-y-4 pt-6 border-t border-gray-100 mt-10 pb-2">
      <label className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
        <IoImage className="h-4 w-4 text-gray-600" />
        Riwayat Dokumentasi Terupload
      </label>
      <div className="flex  max-w-4xl overflow-x-auto gap-8 ">
        {documentation?.map((doc, idx) => {
          const cheking = isActiveUpdate && isActiveUpdate === doc._id;
          return (
            <form
              onSubmit={handleSubmit(handleUpdateDoc)}
              key={idx}
              className=" border border-gray-100 rounded-xl bg-white p-4.5 flex flex-col gap-4 shadow-xs hover:border-gray-200 transition-all duration-200 max-w-[300px] h-fit"
            >
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 justify-between  mb-5">
                  <div>
                    {cheking && (
                      <Button
                        type="submit"
                        className={"cursor-pointer"}
                        size="xs"
                        variant="outline"
                      >
                        Update Dokumentasi
                      </Button>
                    )}
                  </div>

                  <div className=" flex justify-end w-fit items-center   gap-1">
                    <BadgeSimpleUse
                      desc={"Edit"}
                      icon={<LucidePenBox />}
                      handleDelete={() => handleEditDoc(doc._id)}
                    />

                    {!checkIsFinish && !checkLengthDocOld && (
                      <DialogDelete
                        text={"Hapus"}
                        icon={<LucideDelete />}
                        title={
                          "Apakah Anda Yakin Ingin Menhapus Dokuementasi Ini?"
                        }
                        desc={
                          "Dokumentasi Perjalanan Ini Juga Akan Terhapus Di Rombongan Dan Pemandu Terkait"
                        }
                        onSubmit={() => handleDeleteDoc(doc._id)}
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  {doc.uploadAt && (
                    <BadgeSimpleUse
                      desc={`Diupload ${formatDateId(doc?.uploadAt)}`}
                      variant={"secondary"}
                      icon={<LucideCloudUpload />}
                    />
                  )}
                </div>

                <Note register={register(`documentation.${idx}.note`)} />

                <WatchUploadImg getWatch={getImgOld} idx={idx} />
                <div className="grid gap-5 items-center">
                  <div>
                    {doc.images && doc.images.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Foto Dokumentasi
                        </span>

                        <div className="flex flex-wrap gap-10 pt-0.5 max-w-[300px]">
                          {getImgOld[idx]?.map((img, imgIdx) => {
                            const chekingUpload =
                              getUpload?.[idx]?.[imgIdx]?.[0];
                            const checkCorrectId = isActiveUpdate === doc._id;

                            return (
                              <div className="relative" key={imgIdx}>
                                {chekingUpload instanceof File &&
                                  checkCorrectId && (
                                    <span className="bg-gray-700 absolute text-xs text-white font-semibold w-full">
                                      Gambar Di Update
                                    </span>
                                  )}
                                <img
                                  key={imgIdx}
                                  src={
                                    chekingUpload instanceof File &&
                                    checkCorrectId
                                      ? URL.createObjectURL(chekingUpload)
                                      : img
                                  }
                                  onClick={() =>
                                    handleImgView({
                                      img: getImgOld,
                                      imgIdx,
                                      getUpload,
                                      idxClick: idx,
                                    })
                                  }
                                  className="w-16 h-16 sm:w-22 sm:h-22 rounded-lg object-cover border border-slate-200 shadow-xs hover:scale-105 transition-transform duration-150  cursor-pointer"
                                />

                                {cheking && (
                                  <FileImgUpload
                                    noDisplayText={true}
                                    noMultiUpload={true}
                                    register={register(
                                      `documentation.${idx}.images.${imgIdx}`,
                                    )}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-10">
                    {cheking && <span>Masukan Foto Baru </span>}
                    <div className="flex items-center flex-wrap gap-3 ">
                      {Array.from({ length: isActiveAddImg })?.map((_, i) => (
                        <div>
                          {cheking && (
                            <FileImgUpload
                              register={register(`newAdd.${idx}.images`)}
                            />
                          )}
                        </div>
                      ))}

                      <div>
                        {cheking && (
                          <Button
                            className={"cursor-pointer"}
                            onClick={handleAddPhoto}
                          >
                            <LucidePlus />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          );
        })}
      </div>
    </div>
  );
}
