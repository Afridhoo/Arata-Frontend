export default function RenderListQuickFastInfo({ Icon, title, value  , sizeValue}) {
  return (
    <div className="mt-5 ">
      <div className="flex items-center  gap-1 ">
        <span className="text-black/50  ">{Icon}</span>
        <p className="text-[14px]   text-gray-500  flex items-center gap-3">
          {title}
        </p>
      </div>
      <span className={`${sizeValue || "text-[16px]"} text-gray-800 font-semibold`}>{value}</span>
    </div>
  );
}
