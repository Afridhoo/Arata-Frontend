export default function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#f5f5f7]/60 border border-gray-100/80 transition-colors duration-150 hover:bg-[#f5f5f7]">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-sm text-[#1d1d1f] border border-gray-200/60 shadow-2xs">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-[#6e6e73]">{label}</p>
        <p className="mt-0.5 truncate text-sm font-semibold text-[#1d1d1f]">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}
