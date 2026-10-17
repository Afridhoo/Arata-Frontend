import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import { IoChevronDown } from "react-icons/io5";

export default function OptionUpdate({
  valUpdate,
  options,
  setValUpdate,
  status,
}) {
  return (
    <div className="rounded-xl border border-gray-400 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor="status-select"
          className="text-sm font-semibold text-gray-900 "
        >
          Pilih Status Pemesanan Baru
        </label>
        <div className="flex items-center gap-5">
          <span className="text-xs text-gray-700">Status Saat Ini:</span>

          <BadgeSimpleUse desc={status}  />
        </div>
      </div>

      <div className="relative">
        <select
          id="status-select"
          defaultValue={valUpdate}
          onChange={(e) => setValUpdate(e.target.value)}
          className="block w-full appearance-none rounded-xl border border-emerald-200 bg-white px-4 py-3 pr-10 text-sm font-medium  transition-all cursor-pointer "
        >
          {options.map((el) => (
            <option key={el} value={el}>
              {el.toUpperCase()}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 ">
          <IoChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
