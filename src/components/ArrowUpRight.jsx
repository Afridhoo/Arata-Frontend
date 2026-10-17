import { BsArrowUpRight } from "react-icons/bs";

export default function ArrowUpRight({ text, icon }) {
  return (
    <span
      className={`px-2 py-0.5 text-[15px] flex items-center rounded-full shadow-2xl gap-2 ${text ? "bg-gray-200  " : "font-semibold"}`}
    >
      {text && <p>{text}</p>}

      <span className=" group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">
        {icon ? icon : <BsArrowUpRight />}
      </span>
    </span>
  );
}
