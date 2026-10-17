import { FiX } from "react-icons/fi";

export default function Header({ onCancel, label, NoSticky }) {
  return (
    <header
      className={`${!NoSticky? "sticky top-0" : " w-full "}  bg-white z-[9999] px-6 py-4 border-b border-gray-100 flex items-center justify-between`}
    >
      <div>
        <h2 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
          {label} New Tour Information
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          {label} the details of your adventure package
        </p>
      </div>
      <button
        type="buton"
        onClick={onCancel}
        className="p-1.5 cursor-pointer rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors duration-200"
      >
        <FiX className="text-xl" />
      </button>
    </header>
  );
}
