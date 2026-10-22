import { useParams } from "react-router-dom";
import { UseGetOneTourById } from "../hooks/useTours";
import { useEffect, useState } from "react";

import Header from "../../../components/Header";
import QuickFacts from "../components/TourComponents/QuickFacts";
import TourGuides from "../../../components/TourGuides";
import AboutTour from "../components/TourComponents/AboutTour";
import ImgPreviewTour from "../components/TourComponents/ImgPreviewTour";

import BookingTour from "../components/TourComponents/BookingTour";

import Footer from "@/components/Footer/Footer";
import AccordionUse from "@/components/AccordionUse";
import { DataAccordion } from "@/components/DataAccordion";
import MapLocationTour from "@/components/Maps/MapLocationTour";
import NewLoading from "@/components/loading/NewLoading";
import { EmptySimpleUse } from "@/components/EmptySimpleUse";
import { LucideCircleSlashed } from "lucide-react";
import { AccordionListTourLocations } from "@/components/AccordionListTourLocations";
import Tesimonial from "@/components/HomeComponents/Tesimonial";
import { useIsMobile } from "@/hooks/use-mobile";

import { CarouselPhotoDisplay } from "@/components/CarouselPhotoDisplay";

export default function Tour() {
  const { id } = useParams();

  const { mutate: GetTour, data: tour } = UseGetOneTourById();
  useEffect(() => GetTour({ id }), [id]);
  const [isFullMap, setIsFullMap] = useState(null);
  const checkMobile = useIsMobile();

  if (!tour) return <NewLoading />;

  const {
    guide,
    Review,
    soldOut,
    locations,
    imageCover,
    name,
    startLocation,
    duration,
  } = tour || {};

  if (soldOut)
    return (
      <EmptySimpleUse
        title={"Tour Ini Sudah SOlD OUT"}
        desc={"Silahkan Pilh Tour Lain Dulu yaa"}
        btnText={"Pilih Tour Lain"}
        link={"/tours"}
        icon={<LucideCircleSlashed size={20} />}
      />
    );

  const normalizeDataGuide = guide?.map((el) => {
    const { guideIdentity } = el;
    const { name, photo } = guideIdentity;
    return { ...el, identity: { name, photo } };
  });

  const { destination, hotel } = locations || {};
  const { date, description } = startLocation || {};

  const concatVal = [...destination, ...hotel];
  const getImg = (val) => val.map((el) => el.image);

  return (
    <div className="bg-white min-h-screen font-sans antialiased">
      <article>
        <Header
          img={imageCover}
          nameTour={name}
          startLocName={description}
          subval={`${duration} Hari Perjalanan`}
        />

        {!isFullMap && <BookingTour tour={tour} />}

        <main className="max-w-5xl mx-auto px-6 ">
          <QuickFacts tour={tour} />

          <AboutTour tour={tour} />

          {checkMobile ? (
            <div className="grid gap-10 mb-10">
              <CarouselPhotoDisplay
                img={getImg(destination)}
                aspect="2/3"
                title={"Wisata"}
              />
              <CarouselPhotoDisplay
                img={getImg(hotel)}
                aspect="2/3"
                title={"Akomodasi"}
              />
            </div>
          ) : (
            <>
              <ImgPreviewTour tour={getImg(destination)} title="Wisata" />
              <ImgPreviewTour tour={getImg(hotel)} title="Akomodasi" />
            </>
          )}

          {/* 6. Itinerary / Map */}
          <MapLocationTour
            tour={tour}
            setIsFullMap={setIsFullMap}
            isFullMap={isFullMap}
            noRenderLine={true}
          />

          {date && <AccordionListTourLocations locations={concatVal} />}

          {normalizeDataGuide?.length > 0 && (
            <TourGuides guide={normalizeDataGuide} />
          )}

          {Review && Review?.length > 0 &&
           <Tesimonial TESTIMONIALS={Review} />
           }

          <AccordionUse data={DataAccordion} fullSize={true} />
        </main>

        <div className="mb-10">
          <Footer />
        </div>
      </article>
    </div>
  );
}
