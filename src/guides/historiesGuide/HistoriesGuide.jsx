import NewLoading from "@/components/loading/NewLoading";
import { UseGetHistoriesMe } from "./UseGetHistoriesMe";
import { EmptySimpleUse } from "@/components/EmptySimpleUse";
import { LucideUserRoundSearch, LucideLineChart } from "lucide-react";
import { formatDateId } from "@/utils/convertDate";
import TableBookingAdmin from "@/admin/BookingAdmin/components/BookingAdmin/TableBookingAdmin";
import TablesAdmin from "@/admin/GlobalComponents/TablesAdmin";
import { infoHistories } from "./InfoHistories";
import { useNavigate } from "react-router-dom";

export default function HistoriesGuide() {
  const { data: HistoriesMe } = UseGetHistoriesMe();
  const navigate = useNavigate();

  if (!HistoriesMe) return <NewLoading />;

  if (HistoriesMe?.length === 0)
    return (
      <EmptySimpleUse
        title={"Anda Belum Memiliki Histori Memandu Tour Wisata"}
        icon={<LucideUserRoundSearch className="w-10 h-10 text-[#6e6e73]" />}
      />
    );

  const info = infoHistories({ value: HistoriesMe });

  const tableHead = [
    "nama tour",
    "Total Rating",
    "Rating Diterima",
    "Total Ditugaskan",
    "tugas Wisata Terakhir Kali",
    "Tanggal tugas Terakhir Kali",
  ];

  const filterVal = HistoriesMe?.map((el) => {
    const { getTour, lastAssignedDate, guideReview, histories, totalsHanlde } =
      el;

    const { name, _id } = getTour;
    const { rating, totalsRating } = guideReview;

    const { location } = histories;
    const { description } = location;

    return {
      id: _id,
      data: [
        name,
        rating || 0,
        `${totalsRating || 0} User`,
        totalsHanlde || 0,
        description,
        formatDateId(lastAssignedDate),
      ],
    };
  });

  function handleEdit(id) {
    navigate(`/Documentation/${id}`);
  }

  return (
    <div className="p-10 pt-5">
      <TablesAdmin
        stats={info}
        headline={"Lihat History Memandu"}
        Icon={LucideLineChart}
        role={"Guide"}
        NoActiveSearchTab={true}
      />

      <TableBookingAdmin
        valueTable={filterVal}
        handleEdit={handleEdit}
        tableHead={tableHead}
        handleDelete={false}
      />
    </div>
  );
}
