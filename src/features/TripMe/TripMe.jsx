import { UseGetTripMe, UsePostReviewGuide } from "./UseGetTripMe";
import RenderNullTrip from "./componentes/RenderNullTrip";
import { useState } from "react";
import RenderListQuickFastInfo from "./componentes/RenderListQuickFastInfo";
import {
  LucideBadgeMinus,
  LucideBus,
  LucideCalendar1,
  LucideCamera,
  LucideClock,
  LucideHotel,
  LucideImageUp,
  LucideMapPin,
  LucideMapPinOff,
  LucideUser,
  LucideUserLock,
} from "lucide-react";
import { formatDateId } from "@/utils/convertDate";

import { CarouselPhotoDisplay } from "@/components/CarouselPhotoDisplay";
import ArrowUpRight from "@/components/ArrowUpRight";

import Footer from "@/components/Footer/Footer";
import MapLocationTour from "@/components/Maps/MapLocationTour";
import Review from "@/components/Review";

import NewLoading from "@/components/loading/NewLoading";

import ReviewGuide from "@/components/ReviewGuide";
import TourGuides from "@/components/TourGuides";
import { EmptySimpleUse } from "@/components/EmptySimpleUse";
import Header from "@/components/Header";
import TourGuideHandleDistLocation from "@/components/TourGuideHandleDistLocation";
import { toast } from "sonner";
import { UserNotExist } from "@/components/UserNotExist";
import { AccordionListTourLocations } from "@/components/AccordionListTourLocations";
import { useAuth } from "@/utils/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import LabelHeader from "@/components/LabelHeader";
import RenderDocumentation from "./componentes/RenderDocumentation";

export default function TripMe() {
  const { isUserNotLogin } = useAuth();
  const { data: Trip, isPending } = UseGetTripMe({ enabled: isUserNotLogin });
  const [isFullMap, setIsFullMap] = useState(null);

  const checkMobile = useIsMobile();

  if (!isUserNotLogin) return <UserNotExist />;
  if (isPending) return <NewLoading />;

  if (Trip?.length === 0)
    return (
      <EmptySimpleUse
        title={"Tidak Ada Perjalanan Aktif"}
        desc={"Kamu Sedang Tidak Ada Perjalanan Tour Aktif , Silahkan Booking"}
        link={"/tours"}
        btnText={"Booking Tour"}
        icon={<LucideMapPinOff />}
      />
    );

  const { getTourTrip, getGuideReview, getReview } = Trip || {};

  const activeTrip = getTourTrip?.[0] || {};

  if (activeTrip?.checkDoc <= 0) {
    const { startLocation } = activeTrip || {};
    const { date, time } = startLocation || {};

    const getTime = Array.isArray(time) && time?.[0]?.time;

    return (
      <EmptySimpleUse
        title={"Status Perjalanan Belum Di Update Pemandu"}
        desc={`Pemandu Akan Mengupdate Status Pada Tanggal ${formatDateId(date?.from, true)} Jam ${getTime || "Jam Belum Diatur"}`}
        icon={<LucideBadgeMinus />}
        link={"/services"}
        btnText={"Hubungi Admin"}
      />
    );
  }

  const {
    name,
    maxGroupSize,
    slot,
    dataBoking,
    duration,
    imageCover,
    locations,
    documentation,
    startLocation,
    idBooking,
    _id: idTour,
  } = activeTrip || {};

  const { destination, hotel } = locations || [];
  const { trip } = documentation || {};
  const { date, description: descStart, time = [] } = startLocation || {};

  const getTime = (s) =>
    time.length > 0 && time.find((a) => a.label === s)?.time;

  const getFinalLoc = [...(destination || []), ...(hotel || [])];
  const getImgDocumentation = trip?.flatMap((el) => el.images);
  const {
    uploadAt,
    destination: idDestGroup,
    groupLocation,
    destinationLocation,
    statusHandle,
  } = trip?.[trip?.length - 1] || {};

  function checkTourNotOnGoing() {
    if (trip?.length === 0) {
      toast.info("Gagal Memberikan Review", {
        description: "Pemandu Belum Memulai Perjalanan Tour",
      });
      return false;
    }

    return true;
  }

  const getCoordsBus = [groupLocation || [], destinationLocation || []];
  const checkStatsDoc = statusHandle === "finished";

  const getDest = getFinalLoc?.find(
    (el) =>
      el.coordinates?.toString() === destinationLocation?.toString() &&
      !checkStatsDoc,
  );
  const { description } = getDest || {};

  const getGuide = destination
    ?.flatMap((el) => el.guideReady)
    ?.map((g) => ({
      ...g,
      isActiveHandle:
        g.destinationHandle.includes(idDestGroup) && !checkStatsDoc,
    }));

  const formatGuide = Object.values(
    getGuide?.reduce((acc, cur) => {
      if (!acc[cur._id]) acc[cur._id] = { value: null };

      acc[cur._id].value = cur;
      return acc;
    }, {}),
  );

  const formatFinalGuide = formatGuide?.map((el) => el.value);
  const getGuideHandle = formatFinalGuide?.filter((el) => el.isActiveHandle);

  return (
    <>
      <div className=" bg-white min-h-screen font-sans antialiased ">
        <Header
          img={imageCover}
          nameTour={name}
          subval={
            description
              ? `Wisata Dituju ${description}`
              : "Menunggu Keberangkatan"
          }
          startLocName={descStart}
        />

        <main className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="grid gap-5 border-b pb-10 mt-20">
            <LabelHeader title={"Tour Aktif"} desc={"Perjalanan Anda"} />

            <div className="flex flex-wrap justify-between">
              <RenderListQuickFastInfo
                Icon={<LucideCalendar1 width={18} />}
                value={
                  date &&
                  `${formatDateId(date?.from, true)} ${getTime("startTime") || ""}`
                }
                title={"Keberangkatan Tour"}
              />
              <RenderListQuickFastInfo
                Icon={<LucideCalendar1 width={18} />}
                value={
                  date &&
                  `${formatDateId(date?.to, true)} ${getTime("endTime") || ""}`
                }
                title={"Selesai Tour"}
              />
              <RenderListQuickFastInfo
                Icon={<LucideImageUp width={18} />}
                value={
                  uploadAt ? formatDateId(uploadAt) : "Belum Di Update Pemandu"
                }
                title={"Dokumentasi Diupdate"}
              />
              <RenderListQuickFastInfo
                Icon={<LucideBus width={18} />}
                value={description || "Belum Di Tetapkan Pemandu"}
                title={"Lokasi Dituju"}
              />
            </div>
          </div>

          <div className="flex  flex-wrap justify-between  mt-15 border-b pb-10">
            <div>
              <LabelHeader title={"Perjalanan"} desc={"Lokasi Tujuan"} />

              <div className=" grid grid-cols-2 md:grid-cols-3 gap-10  ">
                <RenderListQuickFastInfo
                  Icon={<LucideClock width={18} />}
                  value={`${duration} Hari`}
                  title={"Durasi"}
                />
                <RenderListQuickFastInfo
                  Icon={<LucideUser width={18} />}
                  value={`${maxGroupSize - slot} / ${maxGroupSize}`}
                  title={"User Booking"}
                />

                <RenderListQuickFastInfo
                  Icon={<LucideUserLock width={18} />}
                  value={`${formatFinalGuide?.length} Orang`}
                  title={"Pemandu"}
                />

                <RenderListQuickFastInfo
                  Icon={<LucideCamera width={18} />}
                  value={`${getImgDocumentation?.length} Gambar`}
                  title={"Dokumentasi"}
                />

                <RenderListQuickFastInfo
                  Icon={<LucideMapPin width={18} />}
                  value={`${destination?.length} Lokasi`}
                  title={" Wisata"}
                />

                <RenderListQuickFastInfo
                  Icon={<LucideHotel width={18} />}
                  value={`${hotel?.length} Tempat`}
                  title={"Akomodasi"}
                />
              </div>
            </div>
            {getGuideHandle?.length > 0 && (
              <div>
                <TourGuideHandleDistLocation
                  guide={getGuideHandle}
                  noBadge={true}
                  privat={true}
                  locHandle={description}
                />
              </div>
            )}
          </div>

          <div className="mt-18">
            <TourGuides guide={formatFinalGuide} privat={true} />
          </div>

          <div className="mt-18 hidden md:flex">
            <AccordionListTourLocations locations={getFinalLoc} />
          </div>

          {getImgDocumentation?.length > 0 && (
            <RenderDocumentation
              idTour={idTour}
              getImgDocumentation={getImgDocumentation}
            />
          )}

          {trip?.length > 0 && (
            <div className="mt-10">
              <MapLocationTour
                tour={activeTrip}
                coordsBus={getCoordsBus}
                setIsFullMap={setIsFullMap}
                isFullMap={isFullMap}
                dateBusUpdateLast={uploadAt}
                lastDestGroup={idDestGroup}
                nameObjectiveLocation={description}
              />
            </div>
          )}

          <div className=" mt-15">
            <ReviewGuide
              guide={formatFinalGuide}
              dataGuideIsReview={getGuideReview}
              idBooking={idBooking}
              idTour={idTour}
              checkTourNotOnGoing={checkTourNotOnGoing}
            />
            <Review
              activeAccordion={!checkMobile}
              idTour={idTour}
              idBooking={idBooking}
              img={imageCover}
              checkTourNotOnGoing={checkTourNotOnGoing}
              dataIsReview={getReview?.[0] || {}}
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
