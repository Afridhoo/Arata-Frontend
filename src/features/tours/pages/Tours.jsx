import { formatDateId } from "../../../utils/convertDate";
import { UseGetTours } from "../hooks/useTours";
import { FiCalendar, FiFlag, FiUser, FiClock, FiHeart } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { FaHotel } from "react-icons/fa";
import HoverCardUse from "@/components/HoverCardUse";
import { UseCreateFavorite } from "@/features/favorite/UseFavorite";
import { UseGetMe } from "@/features/auth/hooks/useAuth";
import NewLoading from "@/components/loading/NewLoading";
import { formatCurrencyId } from "@/utils/convertCurrency";
import { LucideUserCheck2 } from "lucide-react";
import CtaUserNeedLogin from "@/components/CtaUserNeedLogin";
import Footer from "@/components/Footer/Footer";
import PaginationSimpel from "@/components/PaginationSimpel";
import { useState } from "react";
import FilterList from "../components/FilterList";

import { GetParams } from "../components/Params";
import { Button } from "@/components/ui/button";

export default function Tours() {
  const [pagination, setPagination] = useState(1);
  const [paramsFilter] = useSearchParams();

  const params = GetParams(paramsFilter);

  const { data: ToursData, isPending } = UseGetTours({
    page: pagination,
    filter: params,
  });

  const { data: User } = UseGetMe();
  const { mutate: InsertFavorite } = UseCreateFavorite();

  if (isPending) return <NewLoading />;
  const { tour, categories } = ToursData || [];

  const Favorite = ToursData?.favorite || [];

  function handleFavorite(_id) {
    const value = { tour: _id, user: User?._id };
    InsertFavorite({ value });
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="p-5 mb-5 pt-2 border-b border-gray-200">
        <div className="flex gap-2 md:justify-end">
          <FilterList params={params} categories={categories} route={"tours"} />
        </div>
      </div>

      <div className="grid mb-10 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 pb-16  max-w-7xl mx-auto">
        {tour?.map((el, idx) => {
          const cheking = Favorite?.some((x) => x.tour === el?._id);

          return (
            <article
              key={idx}
              className={`bg-white  h-fit md:h-full   rounded-2xl shadow-sm  duration-300 flex flex-col overflow-hidden border border-gray-200 ${el.soldOut && "opacity-75 grayscale-[0.2]"}`}
            >
              <header className="relative h-30 md:h-50 group overflow-hidden bg-gray-100">
                {el.imageCover && (
                  <img
                    src={el.imageCover}
                    className="w-full h-full  object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                )}
                <div className=" absolute  md:top-6 top-2 right-1  md:right-6">
                  {User ? (
                    <HoverCardUse
                      Render={
                        <div
                          className=" bg-white shadow-gray-800  flex items-center gap-2  cursor-pointer backdrop-blur-md px-2 rounded-full py-2 "
                          onClick={() => handleFavorite(el._id)}
                        >
                          <FiHeart
                            className="text-l"
                            fill={cheking ? "orange" : "white"}
                            stroke="orange"
                          />
                        </div>
                      }
                      RenderText={"Simpan Ke Favorite"}
                    />
                  ) : (
                    <CtaUserNeedLogin
                      text={<FiHeart className="text-l" stroke="orange" />}
                    />
                  )}
                </div>
              </header>

              <div className="md:p-6 p-3    flex flex-col">
                <span className="md:text-[20px]  max-w-full line-clamp-2 text-sm font-semibold md:mb-5">
                  {el.name}
                </span>

                <div className="hidden md:grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-gray-700 mt-auto">
                  <div className="flex items-center gap-2">
                    <FiClock className="text-gray-400 text-lg flex-shrink-0" />
                    <span className="truncate font-medium">
                      {el?.duration || "Unknown"} Hari Perjalanan
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-gray-400 text-lg flex-shrink-0" />
                    <span className="truncate font-medium">
                      {el.startLocation.date
                        ? formatDateId(el.startLocation.date, true)
                        : "Belum Diatur"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiFlag className="text-gray-400 text-lg flex-shrink-0" />
                    <span className="truncate font-medium">
                      {el.locations?.destination.length} Wisata
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaHotel className="text-gray-400 text-lg flex-shrink-0" />
                    <span className="truncate font-medium">
                      {el.locations?.hotel.length} Hotel
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUser className="text-gray-400 text-lg flex-shrink-0" />
                    <span className="flex gap-1 items-center truncate font-medium">
                      <span
                        className={`${el.slot < el.maxGroupSize && "line-through text-gray-400"}`}
                      >
                        {el.maxGroupSize}
                      </span>
                      {el.slot < el.maxGroupSize && <span>{el.slot}</span>}
                      <span>Maksimal Grup</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <LucideUserCheck2 size={18} className="text-gray-400  " />
                    <span className="truncate font-medium">
                      {el.maxGroupSize - el.slot} User Booking
                    </span>
                  </div>
                </div>
              </div>

              <footer className="bg-gray-50/50 md:p-6 p-3  border-t border-gray-100 flex items-center justify-between flex-wrap gap-5">
                <div className="flex flex-col">
                  <p className="text-gray-900 flex  items-baseline gap-1">
                    <span className="md:font-bold md:text-xl font-semibold text-sm  ">
                      {formatCurrencyId(el?.price)}
                    </span>
                    <span className="hidden md:block text-xs text-gray-500 font-medium uppercase tracking-wide">
                      / org
                    </span>
                  </p>
                  <div className="flex flex-wrap md:max-w-full max-w-20">
                    <p className="text-gray-600 flex items-center gap-1 mt-1">
                      <span className="font-bold text-gray-900 text-sm">
                        {el.ratingsAverage}
                      </span>
                      <AiFillStar className="text-amber-400 text-sm" />
                      <span className=" text-xs text-gray-500 font-medium ml-1 flex items-center gap-1">
                        <LucideUserCheck2 className="w-4 " />

                        <span>{el.ratingsQuantity}</span>
                      </span>
                    </p>
                  </div>
                </div>
                {el.soldOut ? (
                  <Button variant="outline" className={"text-xs md:text-sm  "}>
                    SOLD OUT
                  </Button>
                ) : (
                  <Link to={`/tour/${el._id}`}>
                    <Button className={"cursor-pointer"}>Detail</Button>
                  </Link>
                )}
              </footer>
            </article>
          );
        })}
      </div>

      <div className="mb-10">
        <PaginationSimpel
          setPagination={setPagination}
          pagination={pagination}
          route={"tours"}
          lengthData={tour?.length}
        />
      </div>
      <Footer />
    </div>
  );
}
