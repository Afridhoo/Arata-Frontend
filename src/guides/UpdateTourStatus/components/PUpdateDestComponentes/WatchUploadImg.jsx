import { IoImage } from "react-icons/io5";

export default function WatchUploadImg({ getWatch, idx }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
        <IoImage className="h-3.5 w-3.5 text-emerald-600" />
        Foto Dokumentasi , Foto Diupload :{getWatch?.[idx]?.length}
      </label>
    </div>
  );
}
