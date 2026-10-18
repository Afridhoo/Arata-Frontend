import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import HeaderPerItem from "./HeaderPerItem";
import { LucideHeart, LucideUsers2 } from "lucide-react";
import { UseGetMe } from "@/features/auth/hooks/useAuth";
import { UseCreateFavorite } from "@/features/favorite/UseFavorite";

import { Link } from "react-router-dom";
export default function CarouselPopularTour({ Tour = [] }) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const { data: User } = UseGetMe();
  const { mutate: InsertFavorite } = UseCreateFavorite();

  function handleFavorite(_id) {
    const value = { tour: _id, user: User?._id };
    InsertFavorite({ value });
  }

  return (
    <section className="w-full py-10  ">
      <div className="md:block hidden">
        <HeaderPerItem
          title={"Tour Terlaris Dibooking"}
          desc={"Tour Ini Menjadi Pilihan Utama Untuk Liburan"}
          textLink={"Lihat Semua Tour"}
          to={"/tours"}
        />
      </div>

      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play}
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent className="-ml-4 md:-ml-6 ">
          {Tour?.length > 0 &&
            Tour?.map((tourItem, index) => {
              const { GetTour, bookedCount, countFavorite } = tourItem;
              const { imageCover, name, description, _id } = GetTour;

              return (
                <CarouselItem
                  key={index}
                  className="md:pl-6  sm:basis-1/3  basis-1/2 lg:basis-1/2 xl:basis-1/3"
                >
                  <Card className=" relative border border-gray-300 mx-auto w-full max-w-sm pt-0">
                    <img
                      src={imageCover}
                      alt={name}
                      className="relative z-20  w-full object-cover "
                    />

                    <CardHeader className="h-20 md:grid flex flex-wrap ">
                      <CardAction className="flex items-center gap-1 ">
                        <Badge variant="default">
                          <span className={" max-w-7 truncate "}>
                            {bookedCount }
                          </span>
                          <span>Sold</span>
                        </Badge>

                        <Badge
                          onClick={() => handleFavorite(_id)}
                          variant="secondary"
                        >
                          <LucideHeart fill="orange" stroke="none" size={20} />

                          <span className={" max-w-7 truncate "}>
                            {countFavorite}
                          </span>
                        </Badge>
                      </CardAction>

                      <CardTitle className={" w-fit max-w-75  "}>
                        {name}
                      </CardTitle>
                      <CardDescription
                        className={
                          "md:block hidden w-fit md:max-w-75 md:line-clamp-2"
                        }
                      >
                        {description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Link className="w-full" to={`/tour/${_id}`}>
                        <Button
                          className={"w-full cursor-pointer"}
                          variant="outline"
                        >
                          Detail Tour
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              );
            })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
