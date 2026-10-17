import { LucideEdit3, LucideUsers2, LucideXCircle } from "lucide-react";
import InfoGuide from "../components/InfoGuide";

export default function Header({
  guideAssigned,
  checkGuideAssingn,
  isActiveEditGuide,
  handleCancelEditGuide,
  handleEditGuide
}) {
  return (
    <div className="grid grid-cols-2 gap-4 bg-emerald-50/40 p-4 rounded-xl border border-emerald-100">
      <div>
        <div className="flex items-start gap-4">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
            <LucideUsers2 className="" />
            Pemandu Wisata Terdaftar ({guideAssigned.length || 0})
          </h4>
          {checkGuideAssingn && (
            <div className="flex items-center gap-2">
              <button
                disabled={isActiveEditGuide}
                onClick={() => handleEditGuide(guideAssigned)}
                className="flex items-center gap-2 disabled:bg-gray-500 disabled:cursor-default  bg-green-700  px-2 py-1 rounded-lg cursor-pointer  hover:bg-green-800"
              >
                <LucideEdit3 className="w-3 h-3 text-white" />
              </button>
              <button
                className="flex items-center gap-2 bg-orange-700  px-2 py-1 rounded-lg cursor-pointer  hover:bg-orange-800"
                onClick={handleCancelEditGuide}
              >
                <LucideXCircle className="w-3 h-3 text-white" />
              </button>
            </div>
          )}
        </div>
        <InfoGuide value={guideAssigned} />
      </div>
    </div>
  );
}
