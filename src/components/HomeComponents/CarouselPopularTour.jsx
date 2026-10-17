import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import DisplayCarouselHome from "./DisplayCarouselHome";


export default function CarouselPopularTour({setNumDisplay  , numDisplay ,Tour , TourRender}) {
  return (
    <div className="w-full lg:w-[35rem] flex-shrink-0 relative">
                   <Carousel
                     className="w-full"
                     setNumDisplay={setNumDisplay}
                     numDisplay={numDisplay}
                     opts={{
                       align: "start",
                     }}
                   >
                     <CarouselContent>
                       {Tour?.getTour?.length > 0 &&
                         Tour?.getTour?.map((tourItem, index) => {
                           return (
                             <CarouselItem key={index}>
                               <DisplayCarouselHome
                                 key={index}
                                 tourItem={tourItem}
                                 dataFavorite={TourRender?.favoriteTour}
                               />
                             </CarouselItem>
                           );
                         })}
                     </CarouselContent>
                     <div className="hidden sm:block">
                       <CarouselPrevious className="-left-6 w-12 h-12 bg-white text-slate-900 border border-slate-100 shadow-md hover:bg-slate-50 hover:text-slate-600 cursor-pointer" />
                       <CarouselNext className="-right-6 w-12 h-12 bg-white text-slate-900 border border-slate-100 shadow-md hover:bg-slate-50 hover:text-slate-600 cursor-pointer" />
                     </div>
                   </Carousel>
                 </div>
  )
}
