import { UseGetTourHomePage } from "@/features/tours/hooks/useTours";
import { useState } from "react";
import JumbotronHome from "@/components/HomeComponents/JumbotronHome";
import PopularTour from "@/components/HomeComponents/PopularTourHeader";
import PopularTourMain from "@/components/HomeComponents/PopularTourMain";
import ListGuideHome from "@/components/HomeComponents/ListGuideHome";
import Tesimonial from "@/components/HomeComponents/Tesimonial";
import AccordionUse from "@/components/AccordionUse";
import { ListItemHomePage } from "@/components/HomeComponents/ListItemHomePage";
import Footer from "@/components/Footer/Footer";
import { DataAccordion } from "@/components/DataAccordion";
import { NormalizeDataGuideRender } from "@/utils/NormalizeDataGuideRender";
import CarouselPopularTour from "@/components/HomeComponents/CarouselPopularTour";

export default function Home() {
  const { data: Tour } = UseGetTourHomePage();

  const [numDisplay, setNumDisplay] = useState(0);
  const TourRender = Tour?.getTour && Tour.getTour[numDisplay];
  const DataGuide = Tour?.getGuide && Tour.getGuide;
  const getReview = Tour?.getTour.flatMap((s) => s.GetReview);
  const getImgCover = Tour?.getTour.flatMap((s) => s?.GetTour?.imageCover);

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-white">
      <JumbotronHome img={getImgCover?.[0]} />

      {TourRender?.GetTour && (
        <section className="py-24 px-6 md:px-12 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <PopularTour />

            <div className="flex  items-center  justify-between gap-12 mt-12 mx-auto max-w-6xl">
              <PopularTourMain TourRender={TourRender} />
              <CarouselPopularTour
                setNumDisplay={setNumDisplay}
                numDisplay={numDisplay}
                Tour={Tour}
                TourRender={TourRender}
              />
            </div>
          </div>
        </section>
      )}

      <section className="py-5 px-6 md:px-12 bg-slate-50">
        <ListGuideHome DataGuide={NormalizeDataGuideRender(DataGuide)} />
      </section>

      <Tesimonial TESTIMONIALS={getReview} />

      <section className=" px-6 md:px-12 bg-slate-50 border-y border-slate-100">
        <div className="  flex justify-between m-10 ">
          <AccordionUse data={DataAccordion} />

          <ListItemHomePage />
        </div>
      </section>

      <Footer />
    </div>
  );
}
