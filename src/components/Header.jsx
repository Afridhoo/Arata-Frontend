import { FaMapMarkerAlt } from "react-icons/fa";

export default function Header({ img, nameTour, startLocName, subval }) {
  return (
    <header className="relative h-[85vh] flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={img} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/35"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 pb-20">
        <p className="text-white/60 text-sm font-medium tracking-widest uppercase mb-4 flex items-center gap-2">
          <FaMapMarkerAlt className="text-xs" />
          {startLocName}
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05]">
          {nameTour}
        </h1>
        <p className="text-white/50 text-lg mt-4 font-normal">{subval}</p>
      </div>
    </header>
  );
}
