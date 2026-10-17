import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import { LucideUserStar } from "lucide-react";

export default function InfoGuide({ value, categories, dest, ...register }) {
  return (
    <div className="grid gap-3 max-h-[350px]  mt-5 overflow-x-auto ">
      {value?.map((guide, idx) => {
        return (
          <div
            key={idx}
            className="flex items-center gap-3 p-5 bg-slate-50 rounded-xl border border-slate-100 relative"
          >
            <img
              src={guide.photo}
              alt={guide.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div className="min-w-0 flex-2 ">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {guide.name}
              </p>
              <p className="text-xs text-slate-500 truncate">{guide.email}</p>

              {categories && (
                <div className="mt-3">
                  <BadgeSimpleUse
                    desc={`${guide.skillGuide.includes(categories._id) && categories?.categoriesTour}`}
                    variant={"outline"}
                  />
                </div>
              )}

              <div className="flex items-center gap-2 mt-2 absolute top-0  right-1">
                <BadgeSimpleUse
                  desc={` ${guide.ratingsQuantity || 0}`}
                  icon={<LucideUserStar />}
                  variant={"outline"}
                />
                <BadgeSimpleUse
                  desc={`⭐ ${guide.ratingsAverage || 0}`}
                  variant={"outline"}
                />
              </div>
            </div>

            {guide.activeDestination?.includes?.(dest._id) && (
              <span className=" mt-0.5 text-[12px] font-medium px-1.5 py-0.5 bg-green-800 text-white rounded ">
                Pemandu Terdaftar
              </span>
            )}

            {dest && (
              <input
                type="checkbox"
                value={`${guide._id}|${dest._id}`}
                defaultChecked={guide.activeDestination?.includes?.(dest?._id)}
                className="cursor-pointer"
                {...register}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
