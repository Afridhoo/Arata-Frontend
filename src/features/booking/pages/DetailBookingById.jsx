import { Link, useParams } from "react-router-dom";
import { UseCancelBooking, UseGetBookingById } from "../hooks/useBooking";
import { useEffect } from "react";

import NewLoading from "@/components/loading/NewLoading";
import { DialogDelete } from "@/components/DialogDelete";
import { Button } from "@/components/ui/button";
import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import { LucideCheck, LucideMousePointer2Off } from "lucide-react";

import AvatarSimpleUse from "@/components/AvatarSimpleUse";

import { formatCurrencyId } from "@/utils/convertCurrency";

import RenderListDate from "../components/RenderListDate";
import { useAuth } from "@/utils/AuthContext";
import { EmptySimpleUse } from "@/components/EmptySimpleUse";

export default function BookingById() {
  const { id } = useParams();
  const {
    mutate: insertId,
    data: booking,
    isPending,
    error,
    isError,
  } = UseGetBookingById();
  const { user } = useAuth();

  const { mutate: cancelId } = UseCancelBooking();

  useEffect(() => {
    if (isError) return;
    insertId({ id });
  }, [id]);

  if (isPending) return <NewLoading />;
  if (isError)
    return (
      <EmptySimpleUse
        title={"Error"}
        desc={`${error?.response?.data?.message || "Silahkan Cek Koneksi Internet Anda"}`}
        icon={<LucideMousePointer2Off />}
      />
    );

  function handleCancel() {
    const id = booking.id;

    cancelId({ id });
  }

  const {
    status,
    confirmAt,
    dateFinished,
    payment,
    quantity,
    totalPrice,
    bookingDate,
    dataTour,
  } = booking || {};

  const { name, imageCover, locations } = dataTour?.[0] || {};
  const { destination, hotel } = locations || {};
  const { photo, name: nameUser } = user || {};

  return (
    <div className="p-20 ">
      <div className="justify-between m-40 mt-0 ">
        <div className="border-b border-gray-100 pb-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="font-bold text-sm  text-gray-500">
              Detail Booking
            </span>
            <h1 className=" text-3xl font-bold text-gray-900 tracking-tight">
              {name}
            </h1>
          </div>

          <BadgeSimpleUse
            desc={status?.toUpperCase()}
            variant={"default"}
            icon={<LucideCheck />}
          />
        </div>

        <div className="flex   justify-between max-w-full flex-wrap">
          <div className="max-w-[380px]">
            <img
              src={imageCover}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div>
            <div>
              <span className="text-[15px] font-semibold text-gray-700">
                Pesanan Akun
              </span>
              <div>
                <span className="mt-5 flex items-center gap-2">
                  <AvatarSimpleUse photo={photo} isActive={true} size={"xs"} />
                  <span className="font-semibold">{nameUser}</span>
                </span>
              </div>
              <div className="mt-6 grid gap-2">
                <span className="font-semibold text-gray-800 text-lg">
                  Informasi Tanggal
                </span>

                <RenderListDate title={"Tanggal Booking"} value={bookingDate} />
                <RenderListDate
                  title={"Tanggal Konfirmasi"}
                  value={confirmAt}
                />

                <RenderListDate
                  title={"Tanggal Selesai"}
                  value={dateFinished}
                  RenderFalseVal={
                    !dateFinished && confirmAt && "Sedang Berjalan"
                  }
                />
              </div>

              <div className="mt-10 ">
                <span className="font-semibold text-gray-800 text-lg">
                  Informasi Biaya
                </span>

                <div className="grid items-center gap-2 mt-2">
                  <span className="font-semibold text-sm   text-gray-700 ">
                    Total Biaya : {formatCurrencyId(totalPrice)}
                  </span>
                  <span className="font-semibold text-sm  text-gray-700">
                    Jumlah Pesanan : {quantity}
                  </span>
                  <span className="font-semibold text-sm  text-gray-700">
                    Pembayaran : {payment}
                  </span>
                </div>
              </div>

              <div className="mt-10 ">
                <span className="font-semibold text-gray-800 text-lg">
                  Informasi Perjalanan
                </span>
                <div className="flex items-center gap-10 mt-2">
                  <span className="text-gray-800 font-semibold text-[15px] grid">
                    Wisata :<span>{destination?.length} Lokasi</span>
                  </span>
                  <span className="text-gray-800 font-semibold text-[15px] grid">
                    Hotel :<span>{hotel?.length} Lokasi</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end mt-10 gap-4 pt-6 border-t">
          {status !== "cancelled" ||
            status !== "finished" ||
            (status !== "ongoing" && (
              <DialogDelete
                text={"Batalkan Booking"}
                title={"Apakah Anda Yakin Ingin Membatalkan Booking"}
                desc={
                  "Data Booking Anda Akan Kami Hapus  , Jika Sudah Membayar Uang Akan Di Kembalikan Segera Ke Rekening Anda"
                }
                defaultVariant={true}
                defaultCss={true}
                onSubmit={handleCancel}
              />
            ))}
          <Link to={"/services"}>
            <Button className="rounded-full cursor-pointer">
              Hubungi Admin
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
