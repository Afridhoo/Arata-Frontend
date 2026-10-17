import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import HoverCardUse from "../HoverCardUse";


export default function PopularTour() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-3xl font-bold tracking-tight mb-6">
          Tour Populer
        </h2>
        <p className="text-slate-500 text-lg md:text-1xl font-medium">
          Tempat wisata favorit yang paling banyak dipesan bulan ini.
        </p>
      </div>
      <HoverCardUse
        Render={
          <Link
            to="/tours"
            className="inline-flex items-center text-slate-900 font-semibold hover:text-slate-600 transition-colors text-lg group"
          >
            Lihat Semua Tour
            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        }
        RenderText={"Ke Halaman Tour"}
      />
    </div>
  );
}
