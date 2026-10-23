import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AvatarSimpleUse from "../AvatarSimpleUse";
import { LucideStar } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const TESTIMONIALS_TEST = [
  {
    identity: { name: "Ayu Lestari", photo: "" },
    rating: 5,
    message:
      "Perjalanannya menyenangkan, pemandunya ramah, dan semua destinasi sesuai deskripsi.",
  },
  {
    identity: { name: "Bima Pratama", photo: "" },
    rating: 4,
    message:
      "Pemandangan yang dikunjungi bagus dan jadwal perjalanan tertata dengan baik.",
  },
  {
    identity: { name: "Citra Maharani", photo: "" },
    rating: 5,
    message:
      "Pengalaman liburan yang berkesan. Saya pasti ingin ikut perjalanan ini lagi.",
  },
];

export default function Tesimonial({ TESTIMONIALS = [] }) {
  const [numDisplay, setNumDisplay] = useState(null);
  const isMobile = useIsMobile();

  const testing = [...TESTIMONIALS, ...TESTIMONIALS_TEST];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12  ">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center mb-14">
        Apa Kata Mereka
      </h2>

      <Carousel
        setNumDisplay={setNumDisplay}
        numDisplay={numDisplay}
        className="w-full relative"
      >
        <CarouselContent>
          {testing?.map((el, idx) => (
            <CarouselItem
              key={idx}
              className={"md:pl-7 basis-1/2 md:basis-1/3 "}
            >
              <Card
                className={"h-[200px] overflow-y-auto border border-gray-200"}
              >
                <CardContent className="w-full h-full  md:p-6">
                  <div className=" flex flex-wrap justify-center text-center md:justify-normal gap-4">
                    <AvatarSimpleUse
                      photo={el?.identity?.photo}
                      isActive={true}
                      noBage={true}
                      size={isMobile && "small"}
                    />
                    <div className="grid ">
                      <span className="w-16 md:w-fit md:block flex flex-wrap">
                        {el?.identity?.name}
                      </span>
                      <div className="flex  items-center overflow-hidden">
                        {Array.from({ length: 5 })?.map((_, i) => (
                          <span key={i}>
                            <LucideStar
                              fill={el.rating >= i + 1 ? "orange" : ""}
                              size={12}
                              stroke="none"
                            />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <CardDescription
                    className={
                      "mt-2 flex md:block md:w-fit w-16 flex-wrap text-xs md:text-sm"
                    }
                  >
                    {el.message}
                  </CardDescription>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className=" right-10  top-60  absolute  ">
          <CarouselPrevious className={"w-[40px] h-[40px] cursor-pointer  "} />
          <CarouselNext className={"w-[40px] h-[40px] cursor-pointer"} />
        </div>
      </Carousel>
    </section>
  );
}
