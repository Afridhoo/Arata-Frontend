export default function Header({ tour }) {
  return (
    <div className="relative h-64 sm:h-80 w-full">
      <img
        src={tour?.imageCover}
        alt={tour.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white text-center tracking-tight px-4 shadow-sm">
          {tour.name}
        </h1>
      </div>
    </div>
  );
}
