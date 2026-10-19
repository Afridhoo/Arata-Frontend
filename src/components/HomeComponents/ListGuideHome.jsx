"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { formatDateId } from "@/utils/convertDate";
import HoverCardUse from "../HoverCardUse";
import { Link } from "react-router-dom";

import ArrowUpRight from "../ArrowUpRight";
import { LucideArrowUpRightFromSquare, LucideStar, LucideUser } from "lucide-react";
import HeaderPerItem from "./HeaderPerItem";
import AvatarSimpleUse from "../AvatarSimpleUse";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ListGuideHome({ DataGuide }) {
  const isMobile = useIsMobile();

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <section className="w-full md:py-10">
      <div >
        <HeaderPerItem
          title={"Pemandu Tour Kami"}
          desc={
            "Berpetualang bersama para pemandu lokal terbaik yang ahli dan berpengalaman."
          }
          textLink={"Lihat Semua Pemandu"}
          to={"/"}
        />
      </div>

      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {DataGuide?.map((el, index) => {
            const {
              email,
              name,
              photo,
              totalHandle,
              assignedAt,
              ratingsQuantity,
              rating,
            } = el;

            return (
              <CarouselItem
                key={index}
                className="md:pl-6 basis-1/2 sm:basis-1/3 lg:basis-1/2 xl:basis-1/3"
              >
                <div className="py-2 h-full">
                  {
                    <HoverCardUse
                      Render={
                        <Link>
                          <Card className="h-full overflow-hidden relative group border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                            <CardContent className="md:p-5 pb-0 flex flex-col h-full bg-card relative">
                              <div className=" flex  absolute top-0 right-3  flex-col gap-1.5 items-end z-10">
                                <LucideArrowUpRightFromSquare size={isMobile ? 12 : 18} />
                              </div>

                              <div className="flex flex-wrap  truncate items-center max-w-30 md:max-w-full gap-4 md:mt-2">
                                <div>
                                  <AvatarSimpleUse
                                    photo={photo}
                                    isActive={true}
                                    noBage={true}
                                    size={isMobile && "small"}
                                  />
                                </div>
                                <div className="flex-1 ">
                                  <h3 className="text-sm md:text-lg font-bold text-foreground truncate w-full">
                                    {name}
                                  </h3>
                                  <p className="text-xs  md:text-sm text-muted-foreground mt-0.5 truncate w-full">
                                    {email}
                                  </p>
                                </div>
                              </div>

                              <div className="hidden md:grid  mt-4 pt-4 border-t border-border/60">
                              
                                <div className=" text-muted-foreground text-xs md:px-2.5 md:py-1.5 rounded-md font-medium flex justify-center md:justify-normal  items-center gap-1.5 flex-wrap md:text-sm ">
                                  <span>Memandu:</span>
                                  <span className="font-bold text-foreground">
                                    {totalHandle || 0} Kali
                                  </span>
                                </div>
                                <div className=" text-muted-foreground text-xs px-2.5 py-1.5 rounded-md font-medium flex items-center gap-1.5 flex-wrap justify-center md:justify-normal md:text-sm">
                                  <span>Sejak:</span>
                                  <span className="">
                                    {assignedAt &&
                                      formatDateId(assignedAt, true)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center px-2.5 py-1.5  gap-4 mt-3 ">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-gray-500">
                                    <LucideStar className="w-4 h-4" />
                                  </span>
                                  <span className="font-medium  text-xs">
                                    {rating || 0}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-gray-500">
                                    <LucideUser className="w-4 h-4" />
                                  </span>
                                  <span className="font-medium text-xs">
                                    {ratingsQuantity || 0}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      }
                      RenderText={`Lihat Detail Pemandu ${el.name}`}
                    />
                  }
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
