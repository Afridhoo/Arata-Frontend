import AvatarSimpleUse from "@/components/AvatarSimpleUse";
import { formatDateId } from "@/utils/convertDate";
import { LucideStar, LucideUser2 } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

export default function TourGuides({ guide, privat, noBadge }) {
  return (
    <section className=" ">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-10">
        List Pemandu Tour
      </h2>
      <div className="flex flex-wrap gap-10 md:gap-24 items-start ">
        {guide?.map((el, idx) => {
          const {
            identity,
            assignedAt,
            isActiveHandle,
            finishedHandle,
            ratingsAverage,
            ratingsQuantity,
          } = el;
          const { name, photo, telphone } = identity;

          return (
            <div key={idx} className="grid items-center gap-4">
              <div className="flex items-center gap-2">
                <AvatarSimpleUse
                  noBage={noBadge}
                  isActive={isActiveHandle}
                  photo={photo}
                  size={isActiveHandle ? "lg" : "small"}
                />

                <div>
                  <p className="text-base font-semibold text-gray-900">
                    {name}
                  </p>

                  {privat && (
                    <p className="text-sm  text-gray-600 mt-0.5 flex items-center gap-1">
                      <BsWhatsapp /> {telphone}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mt-0.5">
                  Total Memandu {finishedHandle || 0}
                </p>

                <p className="text-sm text-gray-600 mt-0.5">
                  Sejak {formatDateId(assignedAt, true)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <LucideStar className="w-4 h-4 text-gray-600" />
                  <p className="text-sm font-semibold">{ratingsAverage || 0}</p>
                </span>
                <span className="flex items-center gap-2">
                  <LucideUser2 className="w-4 h-4 text-gray-600" />
                  <p className="text-sm font-semibold">
                    {ratingsQuantity || 0}
                  </p>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
