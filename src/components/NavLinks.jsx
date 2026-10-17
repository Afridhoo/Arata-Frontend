import { NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
    isActive
      ? "bg-gray-800 text-gray-900 text-white "
      : "text-gray-600 hover:bg-gray-50 hover:text-gray-400 text-black"
  }`;

export default function NavLinks({ to, Icon  , text}) {
  return (
    <NavLink to={to} end className={navLinkClass}>
      <span className="w-8 h-8 flex  items-center justify-center rounded-lg  group-hover:bg-gray-800 transition-colors">
        <Icon className=" text-base" />
      </span>
     {text}
    </NavLink>
  );
}
