export default function ImgPreviewTour({ tour, title }) {
  if (!tour || tour.length === 0) return null;


  const mainImage = tour[0];
  const sideImages = tour.slice(1, 5);
  const extraImages = tour.slice(5);

  return (
    <section className="py-20 border-b border-gray-100">
      {title && (
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-8">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Main large image */}
        <div className="md:col-span-2 md:row-span-2 overflow-hidden rounded-xl">
          <img
            src={mainImage}
            alt={mainImage?.description || "Gallery image"}
            className="w-full h-full min-h-[320px] md:min-h-[420px] object-cover hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
        </div>

        {/* Side images in 2x2 grid */}
        {sideImages.map((val, idx) => (
          <div key={idx} className="overflow-hidden rounded-xl">
            <img
              src={val}
              className="w-full h-48 md:h-full object-cover hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
          </div>
        ))}
      </div>

      {/* Extra images in a simple row if more than 5 */}
      {extraImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
          {extraImages.map((val, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl">
              <img
                src={val}
                className="w-full h-48 object-cover hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
