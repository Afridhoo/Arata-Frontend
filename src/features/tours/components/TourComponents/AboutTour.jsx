
export default function AboutTour({ tour }) {
  return (
    <section className="py-20 border-b border-gray-100">
      <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
        Tentang Tour
      </h2>
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 leading-snug max-w-2xl">
        {tour?.name}
      </h3>
      <div className="max-w-2xl text-base text-gray-500 leading-[1.8] space-y-5">
        {tour?.description?.split("\n").map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
