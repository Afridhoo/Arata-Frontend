import { FaStar } from "react-icons/fa";

export default function ReviewTour({ review }) {
  return (
    <div className="mt-32">
      <h3 className="text-3xl font-bold text-center text-gray-900 uppercase tracking-wide mb-16">
        Review Petualang
      </h3>
      <div className="flex overflow-x-auto space-x-6 pb-12 pt-4 snap-x snap-mandatory px-4 md:px-8 hide-scrollbar">
        {review.map((el, idx) => (
          <div
            key={idx}
            className="snap-center shrink-0 w-80 md:w-[26rem] bg-white p-10 rounded-2xl shadow-sm flex flex-col hover:-translate-y-1 transition-transform duration-300 border border-gray-100"
          >
            <div className="flex items-center space-x-5 mb-8">
              <img
                src={`/src/assets/img/users/${el.user.photo}`}
                alt={el.user.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 shadow-sm"
              />
              <div>
                <p className="text-base font-semibold text-gray-900">
                  {el.user.name}
                </p>
                <div className="flex text-sm mt-1 space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < el.rating ? "text-gray-800" : "text-gray-200"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-500 italic flex-1 leading-relaxed text-base">
              "{el.review}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
