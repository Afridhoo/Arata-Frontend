import { Input } from "@/components/ui/input";

export default function ImagesList({
  index,
  valueLocation,

  ...register
}) {
  const { image, description, typeLocation, address } = valueLocation || {};

  return (
    <div className="flex flex-col gap-1.5 ">
      <label className="text-xs font-semibold text-gray-500">
        Gambar {typeLocation?.toUpperCase()} {index + 1}
      </label>
      <div>
        <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <span className="text-xs font-medium text-gray-400">
            Image {typeLocation}
          </span>

          <div className="mb-5 grid gap-1">
            <span className="font-semibold text-sm ">{description}</span>

            <span className="font-semibold text-gray-600 text-[12px] max-w-[200px] ">
              {address}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {image && (
              <img
                src={image}
                className="w-8 h-8 rounded object-cover border border-gray-200 flex-shrink-0"
              />
            )}
            
            <input
            type="file"
            accept="image/*"
              {...register}
              className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none bg-white transition-all duration-200 text-gray-850 text-xs font-medium"
              placeholder="image-filename.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
