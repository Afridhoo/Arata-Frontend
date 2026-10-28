import { useForm } from "react-hook-form";

import { chekingUseForm } from "../../../utils/chekingUseForm";
import { useState } from "react";
import ViewImg from "./PUpdateDestComponentes/ViewImg";
import Documentation from "./PUpdateDestComponentes/Documentation";
import Header from "./PUpdateDestComponentes/Header";
import DisplayMainElPostDoc from "./PUpdateDestComponentes/DisplayMainElPostDoc";
import { getCoordinatesMe } from "../../../utils/apiPositionMe";
import { useEffect } from "react";

import { toast } from "sonner";

export default function PopupUpdateDestination({
  value,
  onCancel,
  onSave,
  tourId,
  onSaveUpdate,
  handleDeleteDoc,
}) {
  const { handleUpdate, documentationTour, idGuideIdentity } = value;

  const { _id, status, coordinates: destCoords } = handleUpdate;
  const {
    trip,
    _id: idDocumentation,
    userBooking,
  } = documentationTour[0] || [];

  const documentation = trip?.filter((el) => el.destination === _id);

  const [locationMe, setLocationMe] = useState(null);

  useEffect(() => {
    getCoordinatesMe(setLocationMe);
  }, [value]);

  const [imgView, setImgView] = useState(null);
  const [ImgIdx, setImgIdx] = useState(0);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      destinations: {
        idDestination: _id,
        status: status === "pending" ? "" : status,
        tourId,
      },
    },
  });

  const displayToastErr = (text) => toast.error( text );

  function handleImgView(dataImgIdx) {
    const { img, imgIdx, getUpload, idxClick } = dataImgIdx;

    const fileUrlImg = img?.[idxClick].map((el, i) =>
      getUpload?.[idxClick]?.[i]?.[0] instanceof File
        ? URL.createObjectURL(getUpload?.[idxClick]?.[i]?.[0])
        : el,
    );

    setImgView(fileUrlImg);
    setImgIdx(imgIdx);
  }

  function handlePostDoc(data) {
    if (status === "finished")
      return toast.error("Tidak Bisa Update Wisata", {
        description:
          "Anda Atau Pemandu Lain Sudah Konfirmasi Wisata ini Selesai",
      });

    const checkValue = chekingUseForm(data.destinations);
    const formData = new FormData();

    if (!checkValue) return;
    const { destinations } = data;

    const formatCoordinatesMe = [locationMe, destCoords];

    formData.append("coordsMeAndDest", JSON.stringify(formatCoordinatesMe));
    formData.append("GuideIdentityUploadDoc", idGuideIdentity);

    const { imageDocumentation: imgDoc } = destinations;
    const entriesVal = Object.entries(destinations);

    if (imgDoc.length === 0) return displayToastErr("Foto Belum Diupload");
    if (imgDoc.length > 5) return displayToastErr("Batas Upload Foto 5");

    entriesVal.forEach(([key, value]) => {
      if (!key.includes("image")) formData.append(key, value);
    });

    Array.from(imgDoc).forEach((el) =>
      formData.append("imageDocumentation", el),
    );

    const getUserBookingId = userBooking?.map((el) => el.userId);

    if (userBooking && getUserBookingId.length > 0)
      formData.append("idUserBooking", JSON.stringify(getUserBookingId));

    if (typeof locationMe === "string") return toast.error(locationMe);

    onSave(formData);
  }

  return (
    <div className="  fixed inset-0 z-10 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300   ">
      {imgView && (
        <ViewImg
          setImgIdx={setImgIdx}
          setImgView={setImgView}
          ImgIdx={ImgIdx}
          imgView={imgView}
        />
      )}
      <div className=" bg-muted shadow-2xl rounded-4xl  max-w-full  overflow-y-auto  md:p-5">
        <Header _id={_id} onCancel={onCancel} />

        <div className=" p-2 md:p-5  max-w-4xl max-h-[400px]">
          <form
            id="postDocumentation"
            onSubmit={handleSubmit(handlePostDoc)}
            className="space-y-4"
          >
            <DisplayMainElPostDoc
              register={register}
              value={value}
              formId={"postDocumentation"}
            />
          </form>

          <div>
            {documentation && documentation.length > 0 && (
              <div>
                <Documentation
                  documentation={documentation}
                  statusHandle={status}
                  handleImgView={handleImgView}
                  handleSubmitUpdate={onSaveUpdate}
                  id={{ tourId, _id }}
                  documentationId={idDocumentation}
                  handleDeleteDocumentation={handleDeleteDoc}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
