import { LucideSwitchCamera } from "lucide-react";
import { IoArrowForward, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Header({ _id, onCancel }) {
  return (
    <div className="border-b border-gray-100 bg-gray-50/30 p-5  md:pt-2 shrink-0">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm md:text-lg font-bold text-gray-900 flex items-center gap-2">
            <LucideSwitchCamera className="h-5 w-5 text-gray-600" />
            Update Destinasi & Dokumentasi Wisata
          </h3>
          <p className="  hidden md:flex  mt-1 text-xs text-gray-700">
            Pilih status kunjungan destinasi dan lengkapi dokumentasi (catatan &
            foto) untuk setiap lokasi.
          </p>
          <Link
            to={`/tour/${_id}`}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cek Tour
            <IoArrowForward className="h-3.5 w-3.5" />
          </Link>
        </div>
        <button
          onClick={onCancel}
          type="button"
          className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <IoClose className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
