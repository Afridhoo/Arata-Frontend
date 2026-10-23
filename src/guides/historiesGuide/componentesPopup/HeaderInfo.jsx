export default function HeaderInfo({ title, value, icon }) {
  return (
    <div className=" border w-full max-w-xs  border-gray-200 rounded-lg p-4 flex items-center gap-4 ">
      <div className="text-gray-800 ">{icon}</div>
      <div>
        <span className="text-[16px] text-gray-600 font-semibold">{title}</span>
        <div className="text-[12px] font-bold text-gray-500 mt-0.5">{value}</div>
      </div>
    </div>
  );
}
