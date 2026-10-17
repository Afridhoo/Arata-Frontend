import AvatarSimpleUse from "@/components/AvatarSimpleUse";

import { BsWhatsapp } from "react-icons/bs";

export default function TourGuideHandleDistLocation({
  guide,
  privat,
  locHandle,
  noBadge,
}) {
  return (
    <section className=" ">
      <div className="mb-7 text-gray-400 tracking-wider">
        <h2 className="font-semibold uppercase tracking-wider text-[13px]  text-gray-400 flex items-center gap-3 mb-1">
          <span>Pemandu Ditugaskan Wisata</span>
        </h2>

        <h3 className="font-bold text-gray-800 text-[26px]  tracking-tight  flex items-center gap-1">
          <span>{locHandle}</span>
        </h3>
      </div>
      <div className="grid gap-10 items-start ">
        {guide?.map((el, idx) => {
          const { identity, isActiveHandle } = el;
          const { name, photo, telphone } = identity;

          return (
            <div key={idx} className="grid items-center gap-4">
              <div className="flex items-center gap-2">
                <AvatarSimpleUse
                  isActive={isActiveHandle}
                  photo={photo}
                  noBage={noBadge}
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
              {/* <div>
                <p className="text-sm text-gray-600 mt-0.5">
                  Total Memandu {finishedHandle || 0}
                </p>

                <p className="text-sm text-gray-600 mt-0.5">
                  Sejak {formatDateId(assignedAt, true)}
                </p>
              </div> */}

              {/* <div className="flex items-center gap-4">
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
              </div> */}
            </div>
          );
        })}
      </div>
    </section>
  );
}
