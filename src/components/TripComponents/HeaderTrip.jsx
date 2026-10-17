export default function HeaderTrip({ imageCover, name, desc }) {
  return (
    <div>
      <div className="absolute inset-0 h-[75vh]">
        <img className="w-full h-full object-cover " src={imageCover} />
        <div className="absolute inset-0 bg-black/60 z-0"></div>
      </div>
      <div className="relative grid  z-10  text-white  ">
        <h1 className="text-[56px] font-extrabold tracking-tight drop-shadow-sm">
          {name}
        </h1>
        <p className="mt-2 text-[16px] mb-3 max-w-2xl ">{desc}</p>
      </div>
    </div>
  );
}
