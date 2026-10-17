export default function ImagesCover({ imageCover, ...register }) {
  return (
    <div className="space-y-3 pt-2 border-t  border-gray-200">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
        Tour , Media & Images
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Cover */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500">
            Cover Image Filename
          </label>
          <div className="flex items-center gap-3">
            {imageCover && (
              <img
                src={imageCover}
                alt="Cover Preview"
                className="w-12 h-12 rounded-lg object-cover border border-gray-150 flex-shrink-0"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}

            <input
              type="file"
              accept="image/*"
              {...register}
              className="w-screen px-4 py-2 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 font-medium text-sm"
              placeholder="cover-image-filename.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
