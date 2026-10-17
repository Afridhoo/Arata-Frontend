import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HoverCardUse from "./HoverCardUse";
import { useState } from "react";
import { DialogUseSimpleImg } from "./DialogUseSimpleImg";

export function CarouselPhotoDisplay({ img, isDown, RenderText }) {
  const [numDisplay, setNumDisplay] = useState(null);
  const [isOpenDialog, setIsOpenDialog] = useState(null);

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
      className="w-full pt-5"
      setNumDisplay={setNumDisplay}
      numDisplay={numDisplay}
    >
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
                className="basis-1/2 pl-4 cursor-pointer"
                onClick={() => setIsOpenDialog(img)}
              >
                <div
                  key={index}
                  className="aspect-[5/3] overflow-hidden rounded-xl"
                >
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              </CarouselItem>
            }
            RenderText={RenderText || `Gambar Ke ${index}`}
          />
        ))}
      </CarouselContent>
      <div>
        <CarouselNext className="mt-80 mr-14" />
        <CarouselPrevious className="mt-80 ml-232" />
      </div>
    </Carousel>
  );
}
