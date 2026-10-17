import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function BackNavigate() {
  return (
    <div className="fixed top-25 left-3 z-50 ">
      <Link to={-1}>
        <span className="border-gray-800 border-1 text-gray-800 rounded-4xl bg-transparent w-35 shadow-2xs py-3 justify-center  flex items-center gap-2">
          <FaArrowAltCircleLeft />
          <p className="font-semibold">Kembali</p>
        </span>
      </Link>
    </div>
  );
}
