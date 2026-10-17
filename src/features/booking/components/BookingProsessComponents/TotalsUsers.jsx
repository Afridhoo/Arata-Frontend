import { FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import { formatDateId } from "../../../../utils/convertDate";
import NumberIncDex from "../../../../utils/NumberIncDec";

export default function TotalsUsers({ tour, totalParticipants, setQuantity }) {
  const chekingDate = tour.length > 1;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
      {/* Tanggal Berangkat */}
      <div className="space-y-3">
        <label
          htmlFor="tanggal"
          className="flex items-center space-x-2 text-gray-700 font-semibold"
        >
          <FaCalendarAlt className="text-green-500" />
          <span>
            {chekingDate
              ? "Cek Tanggal Berangkat"
              : "Tanggal Di Atur Min.5 Peserta Booking"}
          </span>
        </label>
        {chekingDate && (
          <select
            id="tanggal"
            className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block p-3 shadow-sm transition-all outline-none"
          >
            {tour.dateTour?.map((el, idx) => (
              <option key={idx} value={el}>
                {formatDateId(el)}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Jumlah Peserta */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-gray-700 font-semibold">
          <FaUserFriends className="text-green-500" />
          <span>Jumlah Peserta: {totalParticipants}</span>
        </label>
        <div className="bg-white border border-gray-300 rounded-xl p-2 shadow-sm flex items-center justify-center ">
          <NumberIncDex
            numUser={totalParticipants}
            slot={tour.slot}
            setNumUser={setQuantity}
          />
        </div>
      </div>
    </div>
  );
}
