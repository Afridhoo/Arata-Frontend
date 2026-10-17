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
import { FiArrowRight } from "react-icons/fi";

import ArrowUpRight from "../ArrowUpRight";
import { LucideStar, LucideUser } from "lucide-react";

export default function ListGuideHome({ DataGuide }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <section className="w-full py-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Pemandu Tur Kami
          </h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Berpetualang bersama para pemandu lokal terbaik yang ahli dan
            berpengalaman.
          </p>
        </div>
        <HoverCardUse
          Render={
            <Link className="inline-flex items-center text-slate-900 font-semibold hover:text-slate-600 transition-colors text-lg group">
              Lihat Semua Pemandu
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          }
          RenderText={"Ke Halaman Lihat Pemandu"}
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
                className=" md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="py-2 h-full">
                  {
                    <HoverCardUse
                      Render={
                        <Link>
                          <Card className="h-full overflow-hidden relative group border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-5 pb-0 flex flex-col h-full bg-card relative">
                              <div className="absolute top-0 right-3 flex flex-col gap-1.5 items-end z-10">
                                <ArrowUpRight />
                              </div>

                              <div className="flex items-center gap-4 mt-2">
                                <Avatar className="w-14 h-14 border-2 border-primary/20 shadow-sm text-lg">
                                  <AvatarImage
                                    src={photo}
                                    alt={name}
                                    className="object-cover"
                                  />
                                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                    {name}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0 pr-8">
                                  <h3 className="text-base font-bold text-foreground truncate w-full">
                                    {name}
                                  </h3>
                                  <p className="text-xs text-muted-foreground mt-0.5 truncate w-full">
                                    {email}
                                  </p>
                                </div>
                              </div>

                              <div className="grid  mt-4 pt-4 border-t border-border/60">
                                <div className=" text-muted-foreground text-xs px-2.5 py-1.5 rounded-md font-medium flex items-center gap-1.5">
                                  <span>Total Memandu:</span>
                                  <span className="font-bold text-foreground">
                                    {totalHandle || 0}
                                  </span>
                                </div>
                                <div className=" text-muted-foreground text-xs px-2.5 py-1.5 rounded-md font-medium flex items-center gap-1.5">
                                  <span>Memandu Sejak:</span>
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
