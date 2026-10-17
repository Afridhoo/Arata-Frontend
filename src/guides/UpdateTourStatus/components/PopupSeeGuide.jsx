import { UseGetMe } from "../../../features/auth/hooks/useAuth";
import { IoClose, IoPeople, IoCheckmarkCircle } from "react-icons/io5";
import RenderSameGuide from "./SeeUserComponents/RenderSameGuide";

export default function PopupSeeGuide({ dataGuide, onCancel }) {
  const { data: me } = UseGetMe();

  const formatDataGuide = {
    me: dataGuide?.filter?.((el) => el?.guideIdentity._id === me?._id),
    dataGuide: dataGuide?.filter((el) => el?.guideIdentity._id !== me?._id),
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl transform overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-2xl transition-all flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="border-b border-emerald-100 bg-emerald-50/30 px-6 py-4 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
                <IoPeople className="h-5 w-5 text-emerald-600" />
                Pemandu Wisata Terkait
              </h3>
              <p className="mt-1 text-xs text-emerald-700">
                Daftar pemandu wisata yang ditugaskan secara bersamaan pada tour
                ini.
              </p>
            </div>
            <button
              onClick={() => onCancel()}
              type="button"
              className="rounded-lg p-1.5 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-800 transition-colors cursor-pointer"
            >
              <IoClose className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content - Card List */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RenderSameGuide value={formatDataGuide.me} idLogin={me?._id} />
            <RenderSameGuide value={formatDataGuide.dataGuide} />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-emerald-100 bg-emerald-50/20 px-6 py-4 flex justify-end shrink-0">
          <button
            onClick={() => onCancel()}
            type="button"
            className="px-4 py-3 text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <IoCheckmarkCircle className="h-4 w-4" />
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
