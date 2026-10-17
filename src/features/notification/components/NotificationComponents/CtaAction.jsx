import { FiArrowRightCircle } from "react-icons/fi";

export default function CtaAction({ iconColor, text, Icon, handler }) {
  return (
    <button
      onClick={handler}
      className="flex cursor-pointer hover:bg-amber-50 duration-300 items-center mb-5 border border-gray-500 p-2 rounded-lg max-w-[150px]"
    >
      <Icon className={`w-5 ${iconColor} h-5 mr-2`} />
      <span
        className={`${iconColor}  flex gap-2 underline underline-offset-2 text-xs font-semibold text-left`}
      >
        {text?.toUpperCase()}
        <FiArrowRightCircle className="w-4 h-4" />
      </span>
    </button>
  );
}
