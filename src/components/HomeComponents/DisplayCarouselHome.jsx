import {} from "react-icons/bs";
import { FiHeart, FiUsers } from "react-icons/fi";
import HoverCardUse from "../HoverCardUse";

import { UseCreateFavorite } from "@/features/favorite/UseFavorite";
import { UseGetMe } from "@/features/auth/hooks/useAuth";

export default function DisplayCarouselHome({ tourItem, dataFavorite }) {
  const { mutate: CreateFavorite } = UseCreateFavorite();
  const { data: User } = UseGetMe();

  const { imageCover, slot, maxGroupSize } = tourItem.GetTour;
  const { priceDiscount, _id } = tourItem;

  const getValidFavorite = dataFavorite.find(
    (e) => e.user === User?._id.toString(),
  );

  function handleFavorite() {
    const value = { tour: _id, user: User?._id };
    CreateFavorite({ value });
  }

  return (
    <div className="p-2">
      <div className="rounded-[2rem] overflow-hidden border-0 shadow-lg relative group">
        <div className="flex aspect-[7/6.0] items-center justify-center p-0 relative">
          <img className="w-full h-full object-cover " src={imageCover} />

          <HoverCardUse
            Render={
              <div
                className="absolute bg-white shadow-gray-800 top-6 right-6 flex items-center gap-2  cursor-pointer backdrop-blur-md px-2 rounded-full py-2 "
                onClick={handleFavorite}
              >
                <FiHeart
                  className="text-l"
                  fill={getValidFavorite ? "orange" : "white"}
                  stroke="orange"
                />
              </div>
            }
            RenderText={"Simpan Ke Favorite"}
          />

          <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end pointer-events-none">
            {priceDiscount > 0 && (
              <div className="absolute top-6 right-6 bg-rose-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
                Diskon
              </div>
            )}

            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2 text-gray-800 bg-white backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <FiUsers className="text-lg" />
                <span className="font-semibold text-sm">
                  User Booking {""}
                  {maxGroupSize - slot}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
