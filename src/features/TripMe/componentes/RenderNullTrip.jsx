import { FaArrowRight, FaCompass } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function RenderNullTrip() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 font-sans">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
          <FaCompass className="text-4xl animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          Belum Ada Trip Aktif
        </h2>
        <p className="text-slate-500 mb-8 text-sm sm:text-base leading-relaxed">
          Anda belum memesan tour apa pun saat ini. Cari destinasi favorit Anda
          dan mulailah petualangan baru!
        </p>
        <Link
          to="/tours"
          className="inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-green-200 hover:-translate-y-0.5 cursor-pointer w-full"
        >
          <span>Jelajahi Tour</span>
          <FaArrowRight className="text-sm" />
        </Link>
      </div>
    </div>
  );
}
