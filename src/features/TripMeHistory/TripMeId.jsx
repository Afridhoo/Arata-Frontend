import { useParams } from "react-router-dom";
import { UseGetMeDocId } from "./UseGetDocumentation";
import NewLoading from "@/components/loading/NewLoading";
import RenderListQuickFastInfo from "../TripMe/componentes/RenderListQuickFastInfo";
import { formatDateId } from "@/utils/convertDate";
import {
  LucideCalendar,
  LucideCalendarCheck,
  LucideCalendarClock,
  LucideCamera,
  LucideClock,
  LucideCreditCard,
  LucideCreditCardCheck,
  LucideHotel,
  LucideMapPinCheck,
  LucideMousePointer2Off,
  LucidePictureInPicture,
  LucideUserCheck2,
  LucideUserPlus2,
  LucideUsers2,
  LucideUserStar,
  LucideUserX2,
} from "lucide-react";
import { formatCurrencyId } from "@/utils/convertCurrency";
import ReviewGuide from "@/components/ReviewGuide";
import Review from "@/components/Review";
import TourGuides from "@/components/TourGuides";
import { CarouselPhotoDisplay } from "@/components/CarouselPhotoDisplay";
import ArrowUpRight from "@/components/ArrowUpRight";
import Header from "@/components/Header";
import Footer from "@/components/Footer/Footer";
import BookingTour from "../tours/components/TourComponents/BookingTour";
import { toast } from "sonner";
import { EmptySimpleUse } from "@/components/EmptySimpleUse";
import MapLocationTour from "@/components/Maps/MapLocationTour";
import { useState } from "react";
import { AccordionListTourLocations } from "@/components/AccordionListTourLocations";
import RenderDocumentation from "../TripMe/componentes/RenderDocumentation";

export default function TripMeId() {
  const { id } = useParams();
  const { isPending, data, error } = UseGetMeDocId(id);
  const [isFullMap, setIsFullMap] = useState(null);

  if (isPending) return <NewLoading />;
  if (error)
    return (
      <EmptySimpleUse
        title={"Error"}
        desc={`${error?.response?.data?.message || "Silahkan Cek Koneksi Internet Anda"}`}
        icon={<LucideMousePointer2Off />}
      />
    );

  const {
    getTour,
    reviewTour,
    detailBooking,
    dataGuide,
    trip,
    userBooking,

    guideReview,
  } = data[0];

  const {
    name,
    imageCover,
    _id: idTour,
    duration,
    locations,
    price,
    startLocation,
  } = getTour;

  const {
    bookingDate,
    dateFinished,
    confirmAt,
    payment,
    totalPrice,
    quantity,
    _id: idBooking,
  } = detailBooking;

  const { description } = startLocation || {};
  const { hotel, destination } = locations;
  const { statusUserBooking, totalUserCompleted, totalUserIncompleted } =
    userBooking[0];

  const { destination: idDestGroup } = trip?.[trip?.length - 1] || {};
  const getActiveLocation = [...destination, ...hotel]?.find(
    (el) => el._id === idDestGroup,
  );

  const concatVal = [...(destination || []), ...(hotel || [])]?.map((el) => {
    const getFirst = trip?.find((t) => t.destination === el._id);
    const getLast = trip?.findLast((t) => t.destination === el._id);
    return {
      ...el,
      status: dateFinished ? getLast?.statusHandle : el.status,
      date: {
        from: dateFinished ? getFirst?.assigned_at : el?.date?.from,
        to: dateFinished ? getLast?.completed_at : el?.date?.to,
      },
      dateFinished: dateFinished ? getLast?.uploadAt : el.dateFinished,
      startDate: dateFinished ? getFirst?.uploadAt : el.dateFinished,
    };
  });

  const formatNewGuide = dataGuide?.map((el) => ({
    ...el,
    guide: el.guides,
    isActiveHandle: true,
    identity: { name: el.name, photo: el.photo, _id: el.guides },
  }));

  function checkTourNotOnGoing() {
    if (trip?.length === 0) {
      toast.info("Gagal Memberikan Review", {
        description: "Pemandu Belum Memulai Perjalanan Tour",
      });
      return false;
    }

    return true;
  }

  const formatOldGuide = guideReview?.map((el) => ({
    ...el,
    guide: dataGuide?.find((e) => e.guides === el.guide)?.guides,
  }));

  const getImg = trip?.flatMap((el) => el.images);

  return (
    <div>
      <Header
        img={imageCover}
        startLocName={description || ""}
        nameTour={name}
        subval={`Selesai ${dateFinished && formatDateId(dateFinished)}`}
      />

      {dateFinished && (
        <BookingTour tour={getTour} btnDisplay={"Pesan Tour Ini Lagi"} />
      )}
      <main className="max-w-5xl mx-auto px-6 ">
        <div className="grid">
          <div className="mt-5">
            <div className="flex flex-wrap gap-5 md:gap-20">
              <RenderListQuickFastInfo
                title={"Tanggal Booking"}
                Icon={<LucideCalendar width={18} />}
                value={formatDateId(bookingDate)}
              />
              <RenderListQuickFastInfo
                title={"Konfirmasi Booking"}
                Icon={<LucideCalendarClock width={18} />}
                value={formatDateId(confirmAt)}
              />
              <RenderListQuickFastInfo
                title={"Tanggal Selesai"}
                Icon={<LucideCalendarCheck width={18} />}
                value={
                  dateFinished ? formatDateId(dateFinished) : "Sedang Berjalan"
                }
              />
            </div>
          </div>

          <div className="mt-5">
            <div className="flex flex-wrap  gap-5 md:gap-20">
              <RenderListQuickFastInfo
                title={"Hadir"}
                Icon={<LucideUserCheck2 width={18} />}
                value={`${totalUserCompleted} Orang`}
              />
              <RenderListQuickFastInfo
                title={"Tidak Hadir"}
                Icon={<LucideUserX2 width={18} />}
                value={`${totalUserIncompleted} Orang`}
              />

              <RenderListQuickFastInfo
                title={"Status Rombongan"}
                Icon={<LucideUsers2 width={18} />}
                value={statusUserBooking}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 md:gap-29">
          <div>
            <div className="mt-20">
              <h2 className="font-semibold uppercase tracking-wider text-[13px]  text-gray-400 flex items-center gap-3 mb-1">
                <span>Kunjungan</span>
              </h2>
              <span className="text-[26px] font-bold">Perjalanan</span>
            </div>
            <div className="grid grid-cols-3  ">
              <div>
                <RenderListQuickFastInfo
                  Icon={<LucideClock width={18} />}
                  value={`${duration} Hari`}
                  title={"Durasi"}
                />
                <RenderListQuickFastInfo
                  Icon={<LucideUserStar width={18} />}
                  value={`${dataGuide?.length || 0} Orang`}
                  title={"Pemandu"}
                />
              </div>

              <div>
                <RenderListQuickFastInfo
                  Icon={<LucideMapPinCheck width={18} />}
                  value={`${destination?.length || 0} Lokasi`}
                  title={"Wisata"}
                />

                <RenderListQuickFastInfo
                  Icon={<LucideHotel width={18} />}
                  value={`${hotel?.length || 0} Hotel`}
                  title={"Penginapan"}
                />
              </div>

              <div>
                <RenderListQuickFastInfo
                  Icon={<LucidePictureInPicture width={18} />}
                  value={`${trip?.length || 0} Kali Diupload`}
                  title={"Dokumentasi"}
                />

                <RenderListQuickFastInfo
                  Icon={<LucideCamera width={18} />}
                  value={`${getImg?.length || 0} Gambar`}
                  title={"Photo"}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="mt-20">
              <h2 className="font-semibold uppercase tracking-wider text-[13px]  text-gray-400 flex items-center gap-3 mb-1">
                <span>Detail</span>
              </h2>
              <span className="text-[26px] font-bold">Pembayaran</span>
            </div>

            <div className="flex items-center  gap-20 ">
              <div>
                <RenderListQuickFastInfo
                  Icon={<LucideCreditCardCheck width={18} />}
                  value={`${payment}`}
                  title={"Payment"}
                />

                <RenderListQuickFastInfo
                  Icon={<LucideUsers2 width={18} />}
                  value={`${quantity} Orang`}
                  title={"Jumlah Dipesan"}
                />
              </div>

              <div>
                <RenderListQuickFastInfo
                  Icon={<LucideUserPlus2 width={18} />}
                  value={`${formatCurrencyId(price)} `}
                  title={"Harga Per Orang"}
                />
                <RenderListQuickFastInfo
                  Icon={<LucideCreditCard width={18} />}
                  value={`${formatCurrencyId(totalPrice)}`}
                  title={"Total"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-18 md:flex hidden">
          <AccordionListTourLocations locations={concatVal} />
        </div>

        <RenderDocumentation idTour={idTour} getImgDocumentation={getImg} />

        <div className="mt-30">
          <TourGuides guide={formatNewGuide} noBadge={true} />
        </div>

        {trip?.length > 0 && (
          <div className="mt-10">
            <MapLocationTour
              tour={{ ...getTour, dateFinished }}
              setIsFullMap={setIsFullMap}
              isFullMap={isFullMap}
              noRenderLine={true}
              nameObjectiveLocation={getActiveLocation?.description || ""}
            />
          </div>
        )}

        <div className=" mt-20 ">
          <ReviewGuide
            guide={formatNewGuide}
            dataGuideIsReview={formatOldGuide}
            idBooking={idBooking}
            idTour={idTour}
            idDoc={id}
            checkTourNotOnGoing={checkTourNotOnGoing}
          />
          <Review
            idTour={idTour}
            idDoc={id}
            idBooking={idBooking}
            dataIsReview={reviewTour?.[0] || {}}
            checkTourNotOnGoing={checkTourNotOnGoing}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
