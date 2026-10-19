import { UseGetTourHomePage } from "@/features/tours/hooks/useTours";

import JumbotronHome from "@/components/HomeComponents/JumbotronHome";

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

  const TourRender = Tour?.getTour && Tour.getTour;
  const DataGuide = Tour?.getGuide && Tour.getGuide;
  const getReview = Tour?.getTour.flatMap((s) => s.GetReview);
  const getImgCover = Tour?.getTour.flatMap((s) => s?.GetTour?.imageCover);

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-white">
      <JumbotronHome img={getImgCover?.[0]} />

      {TourRender && (
        <section className="py-24 px-6 md:px-12 bg-slate-50">
          <div className="flex  items-center  justify-between gap-12 mt-12 mx-auto max-w-6xl">
            <CarouselPopularTour Tour={TourRender} />
          </div>
        </section>
      )}

      <section className=" md:py-5 px-6    md:px-12 bg-slate-50">
        <ListGuideHome DataGuide={NormalizeDataGuideRender(DataGuide)} />
      </section>

      <Tesimonial TESTIMONIALS={getReview} />

      <section className=" px-6 md:px-12 bg-slate-50 border-y border-slate-100">
        <div className="  flex justify-between md:m-10 flex-wrap ">
          <AccordionUse data={DataAccordion} />

          <ListItemHomePage />
        </div>
      </section>

      <Footer />
    </div>
  );
}
