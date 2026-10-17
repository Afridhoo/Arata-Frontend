import { FiCheckCircle, FiXCircle } from "react-icons/fi";

export default function Popup({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {title || "Konfirmasi"}
        </h3>
        <p className="text-gray-600 mb-8">
          {message || "Apakah Anda yakin ingin melanjutkan tindakan ini?"}
        </p>

        <div className="flex justify-end gap-3">
          {onCancel && (
            <button
              onClick={onCancel}
              className="flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200"
            >
              <FiXCircle className="w-4 h-4 mr-2" />
              Batal
            </button>
          )}

          <button
            onClick={onConfirm}
            type="submit"
            className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <FiCheckCircle className="w-4 h-4 mr-2" />
            Yakin
          </button>
        </div>
      </div>
    </div>
  );
}
