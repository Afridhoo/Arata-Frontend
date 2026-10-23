import { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  LucideUserX2,
  LucideUserCheck,
  LucideUsers,
  LucideX,
} from "lucide-react";

import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import HeaderInfo from "../componentesPopup/HeaderInfo";
import { Button } from "@/components/ui/button";
import { formatDateId } from "@/utils/convertDate";
import BadgePerStatusLocations from "@/components/BadgePerStatusLocations";
import { UseGetHistoriesMeId } from "../UseGetHistoriesMe";
import { Link, useParams } from "react-router-dom";
import LabelHeader from "@/components/LabelHeader";
import AvatarSimpleUse from "@/components/AvatarSimpleUse";
import { CarouselPhotoDisplay } from "@/components/CarouselPhotoDisplay";

export default function DetailHistories() {
  const { id } = useParams();
  const { data: DetailHistories } = UseGetHistoriesMeId({ id });

  const [pagination, setPagination] = useState(0);

  if (!DetailHistories || DetailHistories.length === 0) return null;

  const paginationValue = DetailHistories[0] || {};

  const { userBooking = {}, trip = [] } = paginationValue;

  const handleReduceNum = (val) =>
    userBooking.reduce((acc, cur) => acc + cur[val], 0);
  const calcUserCompleted = handleReduceNum("totalUserCompleted");
  const calcUserNotCompleted = handleReduceNum("totalUserIncompleted");

  const { statusUserBooking } = userBooking[0];

  return (
    <div className=" max-w-full">
      <div className=" w-full h-full  ">
        <div className="px-6 py-4 flex items-center justify-between  ">
          <LabelHeader
            title={"Detail Histori Perjalanan"}
            desc={"Dokumentasi & Catatan tour"}
          />

          <div className="flex items-center gap-3">
            {DetailHistories.length > 1 && (
              <BadgeSimpleUse
                desc={`
                  Perjalanan ${pagination + 1} dari ${DetailHistories.length}`}
              />
            )}

            <Link to={-1}>
              <Button variant="outline">
                <LucideX />
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-1  overflow-y-auto p-10 space-y-6  ">
          <div className="flex items-center  flex-wrap gap-10">
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
              value={`${calcUserCompleted || 0} Orang`}
              icon={<LucideUsers className="w-5 h-5" />}
            />

            <HeaderInfo
              title={"Peserta Tidak Datang"}
              value={`${!calcUserNotCompleted ? "Tidak Ada Yang Tertingal" : `${calcUserNotCompleted} Orang`} `}
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

            <div className="space-y-6 ">
              {trip?.length > 0 &&
                trip.map((tripData, index) => {
                  const {
                    note,
                    images,
                    locationsHandle,
                    uploadAt,
                    statusHandle,
                    guideUpload,
                  } = tripData;

                  const { description } = locationsHandle;
                  const { GuideIdentity } = guideUpload || {};

                  const { name, photo } = GuideIdentity?.[0] || {};

                  return (
                    <div key={index} >
                      <div className="  absolute  ">
                        <BadgeSimpleUse
                          desc={index + 1}
                          style={"mt-5 ml-1 text-xs text-gray-500 font-bold"}
                          variant={"ghost"}
                        />
                      </div>

                      <div className="bg-white pb-20  rounded-2xl  pl-7 p-5 border-gray-200 border">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                          <div>
                            <div className="flex flex-wrap items-center gap-3 md:gap-5">
                              <p className="text-gray-500  text-[13px] font-bold">
                                {description}
                              </p>

                              <BadgePerStatusLocations status={statusHandle} />
                            </div>
                            <p className="text-gray-800  mt-0 text-xs md:text-[17px] font-medium">
                              {note}
                            </p>

                            <div className="flex flex-wrap gap-5 pt-3">
                              <div className="md:flex hidden">
                                <BadgeSimpleUse
                                  desc={`Upload : ${formatDateId(uploadAt) || ""}`}
                                  variant={"default"}
                                />
                              </div>

                              <span className="flex md:hidden text-xs font-semibold text-gray-700">
                                {formatDateId(uploadAt)}
                              </span>
                              <BadgeSimpleUse
                                desc={`${images?.length || 0} Foto`}
                              />
                            </div>
                          </div>

                          <div className="relative">
                            {GuideIdentity && (
                              <div className="grid md:absolute   md:w-full  justify-end   ">
                                <span className="font-semibold text-gray-500 text-xs  ">
                                  Di Upload Oleh
                                </span>

                                <div className="flex items-center gap-2">
                                  <span className="text-[16px] font-semibold text-gray-800">
                                    {name}
                                  </span>
                                  <AvatarSimpleUse
                                    photo={photo}
                                    isActive={true}
                                    noBage={true}
                                    size={"small"}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {images && images.length > 0 && (
                          <div className="relative">
                            <CarouselPhotoDisplay img={images} isDown={true} />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {DetailHistories.length > 1 && (
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
              {pagination + 1} / {DetailHistories.length}
            </span>

            <Button
              disabled={pagination === DetailHistories.length - 1}
              variant="outline"
              onClick={() =>
                setPagination((prev) =>
                  Math.min(DetailHistories.length - 1, prev + 1),
                )
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
