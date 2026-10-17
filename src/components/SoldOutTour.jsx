import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";
import { BsTicketPerforated } from "react-icons/bs";
import { LuCalendarX } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { RiAlarmWarningLine } from "react-icons/ri";

export default function SoldOutTour() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">

        {/* Badge sold out */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border border-red-200">
            <RiAlarmWarningLine className="text-sm" />
            Tour Tidak Tersedia
          </span>
        </div>

        {/* Main Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-28 h-28 rounded-full bg-orange-50 border-2 border-orange-100 flex items-center justify-center">
              <BsTicketPerforated className="text-orange-400 text-5xl" />
            </div>
            {/* Sold out stamp */}
            <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-red-500 flex items-center justify-center shadow-md border-2 border-white">
              <LuCalendarX className="text-white text-base" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3 leading-tight">
          Tour Ini Sudah{" "}
          <span className="text-red-500">Terjual Habis</span>
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-base mb-2">
          Maaf, semua slot untuk tour ini telah terisi penuh.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Tour yang Anda coba akses sudah tidak memiliki tempat yang tersedia.
          Anda masih bisa melihat detail pemesanan sebelumnya, namun tidak dapat
          melakukan pemesanan baru untuk tour ini.
        </p>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-4 flex flex-col items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
              <FiUsers className="text-blue-500 text-base" />
            </div>
            <p className="text-xs text-gray-400 font-medium">Status Slot</p>
            <p className="text-sm font-semibold text-gray-700">Penuh (0 tersisa)</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-4 flex flex-col items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
              <BsTicketPerforated className="text-orange-400 text-base" />
            </div>
            <p className="text-xs text-gray-400 font-medium">Pemesanan Baru</p>
            <p className="text-sm font-semibold text-red-500">Tidak Tersedia</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-8" />

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors duration-200 shadow-sm w-full sm:w-auto justify-center"
          >
            <HiArrowLeft className="text-base" />
            Kembali
          </button>

          <button
            onClick={() => navigate("/tours")}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm w-full sm:w-auto justify-center"
          >
            <MdOutlineExplore className="text-base" />
            Lihat Tour Lain
          </button>
        </div>

      </div>
    </div>
  );
}
