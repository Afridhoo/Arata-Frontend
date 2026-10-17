import { FaStar } from "react-icons/fa";

export default function Rating({ tour }) {
  return (
    <div>
      <div className="flex items-center space-x-2 text-yellow-500 mb-4 bg-yellow-50 w-max px-3 py-1 rounded-full text-sm font-semibold">
        <FaStar />
        <span className="text-gray-800">
          {tour.ratingsAverage} ({tour.ratingsQuantity} ulasan)
        </span>
      </div>
      <p className="text-gray-600 leading-relaxed text-lg italic">
        "{tour.summary}"
      </p>
    </div>
  );
}
