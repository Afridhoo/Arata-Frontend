import { FaBell } from "react-icons/fa";

export default function HeaderNotification({ notificationsList }) {
  return (
    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
          <FaBell className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Notifikasi
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Informasi terbaru seputar booking dan akun Anda
          </p>
        </div>
      </div>
      <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
        Total: {notificationsList}
      </span>
    </div>
  );
}
