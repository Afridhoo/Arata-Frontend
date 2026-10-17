import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";

export default function Footer({ onCancel }) {
  return (
    <div className="px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/50 flex-shrink-0">
      <button
        type="button"
        onClick={onCancel}
        className="px-5 py-2.5 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-medium text-sm transition-all duration-200 focus:outline-none cursor-pointer"
      >
        Batal
      </button>
      <Button
        type="submit"
        className=" cursor-pointer"
      >
        <FiPlus className="w-4 h-4" />
        Simpan Tour
      </Button>
    </div>
  );
}
