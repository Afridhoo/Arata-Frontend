export default function StatCard({ icon, small, label, value }) {
  return (
    <div className="flex md:h-[120px] h-20 flex-col justify-between rounded-2xl border border-[#e5e5e7] bg-white p-5 transition-all duration-200 hover:border-gray-300 hover:shadow-xs">
      <div className="flex items-center   gap-1 ">
        <span className="flex md:h-9 md:w-9 items-center justify-center rounded-xl  text-[#1d1d1f]">
          {icon}
        </span>
        <p className=" w-20 md:w-full  truncate text-xs md:text-sm font-medium text-gray-600">
          {label}
        </p>
      </div>
      <div className="mt-3">
        <p className={` text-center font-semibold text-[#1d1d1f] text-xs md:text-lg "}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
