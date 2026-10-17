import {
  FaChartLine,
  FaClock,
  FaUserCheck,
  FaUserFriends,
} from "react-icons/fa";

export default function QuickFacts({ tour }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <FaClock className="text-xl" />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Durasi</p>
          <p className="text-gray-900 font-semibold">{tour.duration} Hari</p>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <div className="p-3 bg-green-50 text-green-600 rounded-xl">
          <FaChartLine className="text-xl" />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Tingkat Kesulitan</p>
          <p className="text-gray-900 font-semibold capitalize">
            {tour.difficulty}
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
          <FaUserFriends className="text-xl" />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Maksimal Peserta</p>
          <p className="text-gray-900 font-semibold">
            {tour.maxGroupSize} Orang
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
          <FaUserCheck className="text-xl" />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Slot Tersedia</p>
          <p className="text-gray-900 font-semibold">
            {tour?.slot || tour.maxGroupSize} Orang
          </p>
        </div>
      </div>
    </div>
  );
}
