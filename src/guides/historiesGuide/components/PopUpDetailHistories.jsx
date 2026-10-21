import { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Users,
  Image as ImageIcon,
  Compass,
  Maximize2,
  Camera,
  LucideMapPinCheck,
  LucideCheck,
  LucideUserX2,
  LucideUserCheck,
  LucideUsers,
} from "lucide-react";
import { DialogUseSimpleImg } from "@/components/DialogUseSimpleImg";
import { toastSucsess } from "@/components/UseToastSimple";
import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import HeaderInfo from "../componentesPopup/HeaderInfo";
import { Button } from "@/components/ui/button";
import { formatDateId } from "@/utils/convertDate";
import BadgePerStatusLocations from "@/components/BadgePerStatusLocations";

export default function PopUpDetailHistories({ value = [], onClose }) {
  const [pagination, setPagination] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen || !value || value.length === 0) return null;

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const paginationValue = value[pagination] || {};

  const { userBooking = {}, trip = [] } = paginationValue;

  const { statusUserBooking, totalUserCompleted, totalUserIncompleted } =
    userBooking[pagination];

  function handleDownload() {
    const downloadUrl = selectedImage.replace(
      "/image/upload/",
      "/image/upload/fl_attachment/",
    );
    window.location.href = downloadUrl;
    setSelectedImage(null);
    toastSucsess({ title: "Berhasil Download Gambar" });
  }

  return (
    <div className="absolute inset-0 z-[9] flex items-center justify-center ">
      <div className=" absolute z-[9999]">
        <DialogUseSimpleImg
          isOpen={selectedImage}
          img={selectedImage}
          setIsOpen={setSelectedImage}
          onSucsess={handleDownload}
          title={"Download Photo Perjalanan"}
          desc={"Anda Yakin Ingin Mengunduh Foto Ini"}
        />
      </div>
      <div className="relative w-full h-full md:w-[96vw] md:h-[94vh]  text-slate-100 md:rounded-3xl shadow-2xl border  flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between  sticky top-0 z-20 backdrop-blur-md bg-white">
          <div className="flex items-center gap-3">
            <LucideMapPinCheck className="w-7 h-7 text-gray-700" />

            <div className="grid">
              <h2 className="text-lg font-bold text-gray-800 tracking-tight ">
                Detail Histori Perjalanan
              </h2>
              <p className="text-sm font-semibold  text-gray-600">
                Dokumentasi & catatan aktivitas selama memandu tour
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {value.length > 1 && (
              <BadgeSimpleUse
                desc={`
                  Perjalanan ${pagination + 1} dari ${value.length}`}
              />
            )}

            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-gray-400 text-white  cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1  overflow-y-auto p-10 space-y-6  bg-white">
          <div className="flex flex-wrap items-center  justify-between gap-5">
            <HeaderInfo
              title={"Status Rombongan"}
              value={
                statusUserBooking === "incompleted"
                  ? "Ada Peserta Yang Tidak Datang"
                  : "Semua Peserta Datang"
              }
              icon={
                statusUserBooking === "incompleted" ? (
                  <LucideUserX2 className="w-5 h-5" />
                ) : (
                  <LucideUserCheck className="w-5 h-5" />
                )
              }
            />

            <HeaderInfo
              title={"Peserta Ikut"}
              value={`${totalUserCompleted || 0} Orang`}
              icon={<LucideUsers className="w-5 h-5" />}
            />

            <HeaderInfo
              title={"Peserta Tertinggal"}
              value={`${!totalUserIncompleted ? "Tidak Ada Yang Tertingal" : `${totalUserCompleted} Orang`} `}
              icon={<LucideUsers className="w-5 h-5" />}
            />
          </div>

          <div className="space-y-8 mt-20">
            <div className="flex items-center  border-b border-gray-400 pb-3">
              <h3 className="text-sm font-bold text-gray-700  flex items-center gap-2">
                <Camera className="w-4 h-4 " />
                Catatan & Foto Aktivitas ({trip?.length || 0} Note)
              </h3>
            </div>

            <div className="space-y-6 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 sm:before:left-6">
              {trip?.length > 0 &&
                trip.map((tripData, index) => {
                  const {
                    note,
                    images,
                    locationsHandle,
                    uploadAt,
                    statusHandle,
                  } = tripData;

                  const { description } = locationsHandle;

                  return (
                    <div key={index} className="relative pl-10 sm:pl-14 group">
                      <div className="absolute left-3.5  top-1.5  ">
                        <BadgeSimpleUse desc={index + 1} variant={"default"} />
                      </div>

                      <div className="bg-white   rounded-2xl p-5 border-gray-200 border">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-3 md:gap-5">
                              <p className="text-gray-500  text-[13px] font-bold">
                                {description}
                              </p>

                              <BadgePerStatusLocations status={statusHandle} />
                            </div>
                            <p className="text-gray-800  mt-3 md:mt-0 text-xs md:text-[17px] font-medium">
                              {note}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-5">
                            <BadgeSimpleUse
                              desc={`${formatDateId(uploadAt) || ""}`}
                              variant={"outline"}
                            />
                            <BadgeSimpleUse
                              desc={`${images?.length || 0} Foto`}
                            />
                          </div>
                        </div>

                        {images && images.length > 0 && (
                          <div className={`flex gap-10 `}>
                            {images.map((img, idx) => (
                              <div
                                key={idx}
                                onClick={() => setSelectedImage(img)}
                                className="group/img relative  rounded-xl overflow-hidden  border  cursor-pointer  max-w-[100px] max-h-[100px]  shadow-sm  transition-all duration-200"
                              >
                                <img
                                  src={img}
                                  alt={`Dokumentasi ${note} ${idx + 1}`}
                                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                  <Maximize2 className="w-5 h-5 text-white drop-shadow-md" />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Footer / Pagination Controls */}
        {value.length > 1 && (
          <div
            className="px-6 py-4 bg-white border-t border-gray-300 flex items-center justify-between 
          "
          >
            <Button
              disabled={pagination === 0}
              onClick={() => setPagination((prev) => Math.max(0, prev - 1))}
              className="flex items-center cursor-pointer text-gray-800 rounded-full"
              variant="outline"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs font-semibold">
                Perjalanan Sebelumnya
              </span>
            </Button>

            <span className="text-xs text-slate-400 font-medium">
              {pagination + 1} / {value.length}
            </span>

            <Button
              disabled={pagination === value.length - 1}
              variant="outline"
              onClick={() =>
                setPagination((prev) => Math.min(value.length - 1, prev + 1))
              }
              className="flex items-center cursor-pointer text-gray-800 rounded-full"
            >
              <span className="text-xs font-semibold">
                Perjalanan Selanjutnya
              </span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
