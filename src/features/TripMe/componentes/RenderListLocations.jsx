import {
  FaBus,
  FaCalendarAlt,
  FaClock,
  FaInfoCircle,
  FaUserShield,
  FaWhatsapp,
} from "react-icons/fa";
import { formatDateId } from "../../../utils/convertDate";
import { FiArrowDown, FiNavigation } from "react-icons/fi";
import { useState } from "react";
import calcDistanceDuration from "../../../utils/calcDistanceDuration";

export default function RenderListLocations({
  getFinalLoc,
  Line,
  handleClickMaps,
}) {
  const [isActiveDetail, setIsActiveDetail] = useState(null);

  const { coordinatesBus, idLocations } = Line;
  const { segment } = coordinatesBus;
  const { distance, duration } = segment;
  const calcDurationRute =
    distance && duration && calcDistanceDuration({ distance, duration });
  function handleSeeDetail(id) {
    if (isActiveDetail === id) setIsActiveDetail(null);
    else setIsActiveDetail(id);
  }

  return (
    <div className="max-h-[400px] overflow-y-auto">
      {getFinalLoc.map((loc, idx) => (
        <div
          className={`  relative mb-2 ml-4 pl-7 space-y-8 border-l-2 ${loc.status === "ongoing" ? "border-orange-400" : "border-green-100"} `}
        >
          <div key={idx} className="relative ">
            <span
              className={`absolute -left-10 top-1 flex h-6 w-6 items-center justify-center rounded-full  border-2 text-xs font-bold
                      ${loc.status === "ongoing" ? "ring-orange-400 border-orange-600 text-orange-800 bg-orange-200" : "bg-green-50 ring-white border-green-600 text-green-600"}
                       ring-4 `}
            >
              {idx + 1}
            </span>

            <div className="absolute z-999  left-160 top-14">
              <button
                onClick={() => handleSeeDetail(loc._id)}
                className={` duration-300 border cursor-pointer  p-2 rounded-full ${isActiveDetail === loc._id ? "border-orange-700 hover:bg-orange-800 bg-orange-700 " : "hover:bg-green-800 border-green-700"} `}
              >
                <FiArrowDown
                  className={`${loc._id === isActiveDetail ? "text-white" : "text-green-500"}`}
                />
              </button>
            </div>

            <div
              onClick={() => handleClickMaps(loc.coordinates, loc._id)}
              className="bg-slate-50 cursor-pointer hover:bg-slate-200 duration-300 rounded-2xl p-5 border border-slate-100/80  transition-colors"
            >
              <div className="flex flex-col md:flex-row gap-5">
                {loc.image && (
                  <img
                    src={loc.image}
                    className="w-full md:w-32 h-24 object-cover rounded-xl shadow-sm border border-slate-200"
                  />
                )}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="font-semibold text-slate-800 text-base sm:text-lg">
                      {loc.description || "Lokasi Destinasi"}
                    </h3>

                    {loc.status && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-amber-200 text-amber-700 border border-amber-200`}
                      >
                        {loc.status === "hotel" ? "Hotel" : "Wisata"}
                      </span>
                    )}
                    {loc.status && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          loc.status === "ongoing"
                            ? "bg-blue-600 text-white border border-green-200"
                            : "bg-amber-100 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {loc.status}
                      </span>
                    )}
                  </div>

                  {loc.description && (
                    <p className="text-slate-500 text-sm mb-3 flex items-start gap-1.5">
                      <FaInfoCircle className="text-slate-400 mt-1 shrink-0" />
                      <span className="truncate max-w-xs">{loc.address}</span>
                    </p>
                  )}

                  {loc.date && (
                    <p className="text-slate-400 text-xs font-semibold flex items-center gap-1.5 mb-3">
                      <FaCalendarAlt className="text-green-600" />
                      <span>Tanggal Kunjungan: {formatDateId(loc.date)}</span>
                    </p>
                  )}
                  {calcDurationRute && loc._id === idLocations && (
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 ">
                        <FaClock className="w-3 h-3 text-orange-400" />
                        <h2 className="font-semibold text-sm text-orange-400">
                          Durasi Perjalanan {calcDurationRute?.duration}
                        </h2>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaBus className="w-3 h-3 text-orange-400" />
                        <h2 className="font-semibold text-sm text-orange-400">
                          Jarak Bus Ke Lokasi {calcDurationRute?.distance}
                        </h2>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {loc.guideReady && isActiveDetail === loc._id && (
                <div className="mt-4 pt-4 border-t border-slate-200/60 ">
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <FaUserShield /> Guide Bertanggung Jawab
                  </p>
                  <div className="space-y-4">
                    {loc.guideReady.map((el, gIdx) => {
                      const { identity: guide } = el;

                      return (
                        <div key={gIdx} className="flex items-center gap-4">
                          <img
                            src={guide.photo}
                            alt={guide.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-green-100"
                          />
                          <div className="space-y-0.5">
                            <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                              {guide.name}
                            </h4>

                            <div className="grid gap-1 font-medium">
                              <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500">
                                <a className="hover:text-green-700 flex items-center text-xs gap-1.5 transition-colors">
                                  <FaWhatsapp className="text-green-700" />
                                  {guide.telphone}
                                </a>
                              </div>{" "}
                              <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500">
                                <a className="hover:text-green-700 flex items-center text-xs gap-1.5 transition-colors">
                                  <FiNavigation className="text-green-700" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
