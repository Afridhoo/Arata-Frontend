import { FaCalendarAlt, FaUserAlt, FaClock } from "react-icons/fa";
import { formatDateId } from "../../../../utils/convertDate";
import { LucideTags } from "lucide-react";

export default function QuickFacts({ tour }) {
  const { startLocation, maxGroupSize, slot, duration, categories } = tour;
  const { date } = startLocation;
  const { categoriesTour } = categories || {};
  const facts = [
    {
      icon: <FaCalendarAlt className="text-base text-gray-400" />,
      label: "Tanggal Berangkat",
      value: date ? formatDateId(date) : "Ditentukan setelah min. 5 peserta",
    },
    {
      icon: <FaClock className="text-base text-gray-400" />,
      label: "Durasi",
      value: `${duration} Hari`,
    },
    {
      icon: <LucideTags className="text-base text-gray-400" />,
      label: "Kategori",
      value: categoriesTour,
    },
    {
      icon: <FaUserAlt className="text-base text-gray-400" />,
      label: "Maks. Peserta",
      value: slot < maxGroupSize ? `${slot} Orang` : `${maxGroupSize} Orang`,
    },
  ];

  return (
    <section className="py-16 border-b border-gray-100">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
        {facts.map((fact, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-2 mb-2">
              {fact.icon}
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                {fact.label}
              </p>
            </div>
            <p className="text-lg font-semibold text-gray-900 capitalize">
              {fact.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
