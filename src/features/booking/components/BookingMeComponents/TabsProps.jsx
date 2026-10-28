import { FiCalendar, FiUsers } from "react-icons/fi";
import { formatCurrencyId } from "../../../../utils/convertCurrency";
import { Link } from "react-router-dom";
import { formatDateId } from "../../../../utils/convertDate";
import { EmptySimpleUse } from "@/components/EmptySimpleUse";
import { LucideArrowUpRight, LucideShoppingCartMinus } from "lucide-react";

import { DialogForm2Fields } from "@/components/DialogForm2Fields";
import { DialogDelete } from "@/components/DialogDelete";
import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";

const statusStyles = {
  PENDING: "bg-amber-50 text-amber-700 border border-amber-200",
  CONFIRMED: "bg-blue-50 text-blue-700 border border-blue-200",
  FINISHED: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  CANCELLED: "bg-rose-50 text-rose-700 border border-rose-200",
};

export default function TabsProps({
  value,
  handleCancelBooking,
  statusActive,
  userMe,
  handlePostReview,
  handleDeleteReview,
}) {
  const getBooking = value?.filter((el) => el.tour !== null);

  function handleSubmit(value) {
    const { idBooking, message, selectOptions: rating, tourid } = value;

    const format = {
      tour: tourid,
      message: message,
      rating: rating,
      ratingType: rating <= 3 ? "bad" : "nice",
      user: userMe._id,
      booking: idBooking,
    };

    handlePostReview(format);
  }

  if (getBooking?.length === 0)
    return (
      <EmptySimpleUse
        title={`Kamu Tidak Memiliki Booking Dengan Status ${statusActive !== "semua" ? statusActive?.toUpperCase() : "Apapun"}`}
        desc={"Silahkan Refresh Halaman Jika Merasa Punya"}
        icon={<LucideShoppingCartMinus />}
        link={"/tours"}
        btnText={"Pesan Sekarang"}
      />
    );
  const fieldsForSelect = [
    { value: null, label: "" },
    { value: 1, label: "Rating 1" },
    { value: 2, label: "Rating 2" },
    { value: 3, label: "Rating 3" },
    { value: 4, label: "Rating 4" },
    { value: 5, label: "Rating 5" },
  ];

  return (
    <div className="flex flex-wrap flex-col gap-6 p-4 md:p-9 max-w-7xl mx-auto">
      {getBooking?.map((el) => {
        const badgeStyle =
          statusStyles?.[el.status.toUpperCase()] ||
          "bg-gray-50 text-gray-700 border border-gray-200";

        const { rating, message, _id: idReview } = el.review[0] || {};
        const { _id: idDoc } = el.documentation[0] || {};

        const fieldsForInput = [
          {
            name: "Masukan Pesan Review",
            register: "message",
            type: "text",
            default: message,
            hidden: false,
          },
          {
            register: "idBooking",
            type: "text",
            default: el._id,
            hidden: true,
          },
          {
            register: "tourid",
            type: "text",
            hidden: true,
            default: el.tour._id,
          },
        ];

        return (
          <article
            key={el.id}
            className="bg-white rounded-2xl shadow-xs flex flex-col lg:flex-row overflow-hidden border border-gray-200 group"
          >
            <div className="p-6 flex-grow flex flex-col sm:flex-row gap-6 items-center sm:items-start border-b lg:border-b-0 lg:border-r border-gray-200">
              <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-xl shadow-sm relative group">
                <img
                  className="w-full h-full object-cover  "
                  src={el.tour.imageCover}
                />
              </div>

              <div className="flex flex-col items-center sm:items-start flex-grow h-full justify-between gap-3 w-full">
                <div className="flex flex-col items-center sm:items-start gap-2 w-full">
                  <div className=" flex-wrap flex items-center gap-3 w-full justify-between sm:justify-start">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full tracking-wide shadow-sm ${badgeStyle}`}
                    >
                      {el.status.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                      <FiCalendar className="text-gray-400" />
                      <span>{formatDateId(el.bookingDate)}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight text-center sm:text-left mt-1">
                    {el.tour.name}
                  </h3>
                </div>
                <div className="flex flex-wrap  items-center justify-between  w-full max-w-full ">
                  <div className="flex flex-wrap items-center gap-2">
                    {idDoc && (
                      <Link to={`/tripMe/${idDoc}`}>
                        <BadgeSimpleUse
                          desc={"Dokumentasi Perjalanan"}
                          icon={<LucideArrowUpRight />}
                          variant={"default"}
                        />
                      </Link>
                    )}
                    {idDoc && rating && (
                      <DialogDelete
                        title={`Apakah Anda Yakin Ingin Menghapus Review Tour ${el?.tour?.name}`}
                        desc={`Review ${el?.tour?.name} Yang Anda Hapus Masih Bisa Anda Tambahkan Nanti`}
                        text={"Hapus Review"}
                        onSubmit={() => handleDeleteReview(idReview)}
                        defaultVariant={"outline"}
                      />
                    )}
                  </div>
                  <div>
                    {el.status === "pending" && (
                      <DialogDelete
                        title={`Apakah Anda Yakin Ingin Membatalkan Booking ${el?.tour?.name}`}
                        desc={`Jika Ada Kendala Saat Pemesanan Booking ${el?.tour?.name} Silahkan Hubungi Admin Dihalaman Services`}
                        text={"Batalkan Booking"}
                        textSubmit={"Batalkan Booking"}
                        onSubmit={() => handleCancelBooking(el._id)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 grid gap-6">
              <div className="grid">
                <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                  Harga/Orang
                </span>
                <span className="font-semibold text-gray-900">
                  {formatCurrencyId(el.tour.price)}
                </span>
              </div>
              <div className="grid">
                <span className="text-gray-500 text-xs font-medium uppercase tracking-wider flex items-center gap-1">
                  <FiUsers className="text-gray-400" /> Kuantitas
                </span>
                <span className="font-semibold text-gray-900">
                  {el.quantity} Orang
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-center gap-5 lg:min-w-[280px]">
              <div className="flex sm:flex-row lg:flex-col justify-between items-center lg:items-start gap-2 px-2 lg:px-0">
                <span className="text-gray-500 font-medium text-sm">
                  Total Pembayaran
                </span>
                <span className="text-xl font-bold text-gray-900">
                  {formatCurrencyId(el.totalPrice)}
                </span>
              </div>

              <div className="flex  items-center gap-3">
                {idDoc &&
                  (rating ? (
                    <DialogForm2Fields
                      textRender={`Rating Anda ${rating}`}
                      titleForm={`Review Tour ${el?.tour?.name}`}
                      fields={fieldsForInput}
                      selectOptions={fieldsForSelect}
                      handleSubmit={handleSubmit}
                      variantBtn={"default"}
                      defaultValueSelect={rating}
                      textAreaIsActive={true}
                      titleSelect={"Masukan Rating"}
                    />
                  ) : (
                    <DialogForm2Fields
                      textRender={"Beri Review"}
                      titleSelect={"Masukan Rating"}
                      titleForm={`Review Tour ${el?.tour?.name}`}
                      textAreaIsActive={true}
                      fields={fieldsForInput}
                      selectOptions={fieldsForSelect}
                      handleSubmit={handleSubmit}
                    />
                  ))}

                <Link to={`/booking/${el._id}`}>
                  <BadgeSimpleUse
                    desc={"Detail Booking"}
                    icon={<LucideArrowUpRight />}
                    variant={"secondary"}
                    style={"py-4"}
                  />
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
