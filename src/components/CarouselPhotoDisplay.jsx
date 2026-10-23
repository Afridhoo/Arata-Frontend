import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HoverCardUse from "./HoverCardUse";
import { useRef, useState } from "react";
import { DialogUseSimpleImg } from "./DialogUseSimpleImg";
import Autoplay from "embla-carousel-autoplay";
import { useIsMobile } from "@/hooks/use-mobile";

export function CarouselPhotoDisplay({ img, isDown, RenderText, title }) {
  const [numDisplay, setNumDisplay] = useState(null);
  const [isOpenDialog, setIsOpenDialog] = useState(null);
  const checkIsMobile = useIsMobile();
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  function handleDownload() {
    if (isDown) {
      const downloadUrl = isOpenDialog.replace(
        "/image/upload/",
        "/image/upload/fl_attachment/",
      );
      window.location.href = downloadUrl;
    }
    setIsOpenDialog(null);
  }

  return (
    <Carousel
      className="w-full pt-5 relative"
      setNumDisplay={setNumDisplay}
      numDisplay={numDisplay}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.play}
      opts={{ align: "start" }}
    >
      {title && (
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-8">
          {title}
        </h2>
      )}
      <CarouselContent>
        {isDown && isOpenDialog && (
          <DialogUseSimpleImg
            isOpen={isOpenDialog}
            setIsOpen={setIsOpenDialog}
            title={"Anda Yakin Mengunduh Foto Ini ?"}
            onSucsess={handleDownload}
            img={isOpenDialog}
            desc={"Gambar Yang Anda Unduh Ini Akan Masuk Ke Galeri Anda "}
          />
        )}

        {img?.map((img, index) => (
          <HoverCardUse
            key={index}
            Render={
              <CarouselItem
                className={` ${checkIsMobile ? "basis-1/2" : "basis-1/5"} pl-4 cursor-pointer`}
                onClick={() => setIsOpenDialog(img)}
              >
                <div key={index} className={` aspect-[1/1]`}>
                  <img
                    src={img}
                    className="w-full h-full  rounded-xl object-cover"
                  />
                </div>
              </CarouselItem>
            }
            RenderText={RenderText || `Gambar Ke ${index + 1}`}
          />
        ))}
      </CarouselContent>
      <div className="absolute  right-13 -bottom-8">
        <CarouselNext size="lg" />
        <CarouselPrevious size="lg" className={"ml-3"} />
      </div>
    </Carousel>
  );
}
