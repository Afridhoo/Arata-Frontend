import { MdOutlineBlock } from "react-icons/md";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function CannotAcsess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
            <MdOutlineBlock className="text-red-500 text-5xl" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Akses Ditolak
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-base mb-2">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Halaman ini hanya dapat diakses oleh administrator. Jika Anda merasa
          ini adalah kesalahan, silakan hubungi administrator sistem Anda.
        </p>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-8" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors duration-200 shadow-sm"
        >
          <HiArrowLeft className="text-base" />
          Kembali
        </button>
      </div>
    </div>
  );
}
