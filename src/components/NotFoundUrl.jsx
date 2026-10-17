import { MdOutlineSearchOff } from "react-icons/md";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function NotFoundUrl() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">

        {/* Kode 404 */}
        <p className="text-8xl font-extrabold text-gray-200 mb-2 select-none">
          404
        </p>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
            <MdOutlineSearchOff className="text-blue-500 text-5xl" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Halaman Tidak Ditemukan
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-base mb-2">
          Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Pastikan URL yang Anda masukkan sudah benar. Jika masalah berlanjut,
          silakan hubungi administrator sistem Anda.
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
