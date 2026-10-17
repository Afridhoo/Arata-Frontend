import { Link } from "react-router-dom";
import ArrowUpRight from "../ArrowUpRight";

export default function JumbotronHome({ img }) {
  return (
    <section className="relative h-[100vh] flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        {img && <img src={img} className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 pb-20">
        <p className="text-lg md:text-2xl text-white/90 font-medium mb-5 max-w-3xl">
          Temukan destinasi impian, guide profesional, dan pengalaman tak
          terlupakan dalam satu platform.
        </p>
        <Link
          to="/tours"
          className="inline-flex items-center justify-center p-3 rounded-full bg-white text-slate-900 font-semibold text-l group"
        >
          Jelajahi Tour
      <ArrowUpRight />


        </Link>
      </div>
    </section>
  );
}
