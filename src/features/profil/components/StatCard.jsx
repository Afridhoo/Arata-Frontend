export default function StatCard({ icon, small, label, value }) {
  return (
    <div className="flex min-h-[110px] flex-col justify-between rounded-2xl border border-[#e5e5e7] bg-white p-5 transition-all duration-200 hover:border-gray-300 hover:shadow-xs">
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f5f7] text-[#1d1d1f]">
          {icon}
        </span>
      </div>
      <div className="mt-3">
        <p className="text-xs font-medium text-[#6e6e73]">{label}</p>
        <p
          className={`mt-1 font-semibold text-[#1d1d1f] ${
            small ? "text-xs sm:text-sm" : "text-lg sm:text-xl"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
