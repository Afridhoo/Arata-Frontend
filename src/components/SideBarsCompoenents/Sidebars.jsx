import { FiArrowLeftCircle, FiLogOut, FiUserCheck } from "react-icons/fi";
import NavLinks from "../NavLinks";
import { UseSignOut } from "../../features/auth/hooks/useAuth";
import RenderAvatar from "./RenderAvatar";
import InfoUser from "./InfoUser";

export default function Sidebars({ User, Route }) {
  const { mutate: SignOut } = UseSignOut();

  function handleLogOut() {
    SignOut();
  }

  const { name, photo, email, role } = User;

  return (
    <aside className="w-72  bg-white shadow-lg border-r border-gray-100 flex flex-col overflow-y-auto max-h-full">
      {/* Header Sidebar */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <RenderAvatar photo={photo} />

          {/* Info User */}
          <InfoUser role={role} name={name} />
        </div>
      </div>

      {/* Navigasi */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-4 mb-3">
          Akun Saya
        </p>

        {Route?.map((el, idx) => (
          <NavLinks key={idx} to={el.to} Icon={el.icon} text={el.text} />
        ))}
      </nav>

      <div className="mt-10">
        <div className="p-4 border-t border-gray-100">
          {role === "admin" && (
            <NavLinks to={"/admin"} Icon={FiUserCheck} text={"Halaman Admin"} />
          )}

          {role === "guide" && (
            <NavLinks
              to={"/guide"}
              Icon={FiUserCheck}
              text={"Halaman Pemandu"}
            />
          )}
          <NavLinks
            to={"/"}
            text={"Kembali Ke Home"}
            Icon={FiArrowLeftCircle}
          />

          <button
            onClick={handleLogOut}
            className="w-full  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200 group"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
              <FiLogOut className="text-red-500 text-base" />
            </span>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
