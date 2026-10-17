import { FiTrash2, FiMap } from "react-icons/fi";

export default function LocationListTour({
  locationTour,
  handleDeleteLocation,
  handleClickMaps,
  tab,
  isActive,
}) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {tab} Terpilih ({locationTour?.length || 0})
      </div>

      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
        {locationTour?.map((el, index) => {
          const { coordinates } = el.geometry || el || {};
          const { address_line2, place_id, name, description, address } =
            el.properties || el || {};

          const checkId = el?.image ? el._id : place_id;

          return (
            <div
              key={index}
              onClick={() => handleClickMaps(coordinates, checkId)}
              className={`p-3 cursor-pointer relative bg-white border ${isActive === checkId ? "border-green-700" : "border-gray-100"} hover:border-emerald-200 rounded-xl   transition-all duration-200 flex items-center justify-between gap-3 `}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gray-50  flex items-center justify-center  font-bold text-xs">
                  {index + 1}
                </div>

                <div className="min-w-0">
                  <h4 className="font-semibold text-xs text-gray-800 transition-colors">
                    Lokasi {tab} {index + 1}:{" "}
                    {name || description || "Lokasi Tanpa Nama"}
                  </h4>
                  <p className="text-[10px] text-gray-400 truncate mt-0.5 max-w-[200px]">
                    {address_line2 || address}
                  </p>
                </div>
              </div>

              <div className="w-full flex items-center justify-end absolute pr-8 ">
                <button
                  type="button"
                  onClick={() => handleDeleteLocation(place_id || el._id)}
                  className="p-1.5  rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer flex-shrink-0"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {(!locationTour || locationTour.length === 0) && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-dashed border-gray-200 rounded-xl bg-gray-50/30">
            <FiMap className="w-8 h-8 text-gray-300 animate-pulse mb-2" />
            <p className="text-xs text-gray-400 font-medium max-w-[150px]">
              Belum ada lokasi {tab} yang dipilih
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
