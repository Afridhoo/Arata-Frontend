import {
  IoArrowBackCircle,
  IoArrowForwardCircle,
  IoCloseCircle,
} from "react-icons/io5";

export default function ViewImg({ setImgIdx, ImgIdx, imgView, setImgView }) {
  return (
    <div className="fixed inset-0 z-55 flex flex-col items-center justify-center p-4 backdrop-blur-xs transition-all duration-300">
      {/* Close Button */}
      <button
        type="button"
        onClick={() => setImgView(null)}
        className="absolute top-6 right-6 text-red-500  transition-colors cursor-pointer p-2 rounded-full hover:bg-white/10"
        title="Tutup"
      >
        <IoCloseCircle className="w-10 h-10" />
      </button>

      {/* Navigation Controls and Image Area */}
      <div className="relative w-full max-w-4xl h-[75vh] flex items-center justify-center px-12">
        {/* Back Button */}
        {ImgIdx > 0 && (
          <button
            type="button"
            onClick={() => setImgIdx((s) => s - 1)}
            className="absolute left-0 text-emerald-500 transition-all cursor-pointer p-1 hover:scale-110"
           
          >
            <IoArrowBackCircle className="w-12 h-12" />
          </button>
        )}

        {/* Main Image */}
        <div className="w-full h-full flex items-center justify-center select-none">
          <img
            src={imgView[ImgIdx]}
            alt={`Gambar ${ImgIdx + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/10"
          />
        </div>

        {/* Next Button */}
        {ImgIdx < imgView.length - 1 && (
          <button
            type="button"
            onClick={() => setImgIdx((s) => s + 1)}
            className="absolute right-0  text-emerald-500 transition-all cursor-pointer p-1 hover:scale-110"
            title="Berikutnya"
          >
            <IoArrowForwardCircle className="w-12 h-12" />
          </button>
        )}
      </div>

      {/* Image Counter Indicator */}
      <div className="mt-4 text-white/80 text-xs font-semibold tracking-wider bg-white/10 px-4 py-1.5 rounded-full border border-white/5 select-none">
        {ImgIdx + 1} / {imgView.length}
      </div>
    </div>
  );
}
