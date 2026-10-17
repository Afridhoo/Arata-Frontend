import { FiStar } from "react-icons/fi";

("use client");

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

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
import { BadgeSimpleUse } from "../BadgeSimpleUse";

export default function Tesimonial({ TESTIMONIALS }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <section className="py-24 md:py-32 px-6 md:px-12  ">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center mb-14">
        Apa Kata Mereka
      </h2>

      <Carousel
        plugins={[plugin.current]}
        className="w-full  max-w-full relative"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className={"-ml-4 md:-ml-6 "}>
          {TESTIMONIALS?.map((el, idx) => (
            <CarouselItem
              key={idx}
              className={
                "md:pl-7  basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/3 "
              }
            >
              <div className="p-3 ">
                <Card className={"h-[200px] overflow-y-auto"}>
                  <CardContent className="flex items-center  justify-start p-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <AvatarSimpleUse
                          photo={el?.identity?.photo}
                          isActive={true}
                          noBage={true}
                        />
                        <div className="grid">
                          <span>{el?.identity?.name}</span>
                          <div className="flex  items-center">
                            {Array.from({ length: 5 })?.map((_, i) => (
                              <span key={i}>
                                <LucideStar
                                  fill={el.rating >= i + 1 ? "orange" : ""}
                                  size={12}
                                  stroke="none"
                                />
                              </span>
                            ))}

                            <BadgeSimpleUse
                              style={"ml-2"}
                              desc={`${el.rating}/5`}
                              variant={"outline"}
                            />
                          </div>
                        </div>
                      </div>
                      <CardDescription className={"mt-2 "}>
                        {el.message}
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center right-10   top-70  absolute  bg-red-500">
          <CarouselPrevious className={"w-[40px] h-[40px] cursor-pointer  "} />
          <CarouselNext className={"w-[40px] h-[40px] cursor-pointer"} />
        </div>
      </Carousel>
    </section>
  );
}
