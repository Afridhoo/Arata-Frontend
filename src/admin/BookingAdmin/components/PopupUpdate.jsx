import { useState } from "react";
import { IoClose } from "react-icons/io5";
import CustomerInfo from "./PopupUpdateComponents/CustomerInfo";
import BookingDetails from "./PopupUpdateComponents/BookingDetails";
import OptionUpdate from "./PopupUpdateComponents/OptionUpdate";
import { formatDateId } from "../../../utils/convertDate";
import { formatCurrencyId } from "../../../utils/convertCurrency";
import { LucideCalendar1 } from "lucide-react";
;
import { toast } from "sonner";
import { DialogSimpleUse } from "@/components/DialogSimpleUse";

export default function PopupUpdate({ value, onSucsess, onCancel, options }) {
  const { id, payment, totalPrice, status, bookingDate, quantity } = value;
  const { email, telphone, role, name: userName } = value.user;
  const { name: tourName, _id: idTour, price } = value.tour;

  const [statusUpdate, setStatusUpdate] = useState(status);

  function handleUpdate() {
    if (status === statusUpdate)
      return toast.error("Anda Mengupdate Status Yang Sama");

    onSucsess(id, statusUpdate, idTour);
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all ">
        {/* Header */}
        <div className="border-b border-emerald-100 bg-emerald-50/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Konfirmasi Perubahan Booking
              </h3>
              <p className="mt-1 text-xs text-gray-700">
                Harap periksa detail informasi pelanggan dan pesanan di bawah
                ini sebelum melanjutkan.
              </p>
            </div>
            <button
              onClick={onCancel}
              className="rounded-lg p-1.5 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-800 transition-colors cursor-pointer"
            >
              <IoClose className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-6">
          <div className="mb-10">
            <span className="flex items-center  gap-1 text-[15px] font-bold uppercase tracking-wider text-gray-500">
              <LucideCalendar1 size={12} />
              Tanggal Dipesan
            </span>
            <span className="text-sm font-semibold  text-emerald-650">
              {formatDateId(bookingDate)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomerInfo
              name={userName}
              email={email}
              telphone={telphone}
              role={role}
            />

            <BookingDetails
              NamaTour={tourName}
              quantity={quantity}
              payment={payment}
              totalPrice={formatCurrencyId(totalPrice)}
              price={formatCurrencyId(price)}
            />
          </div>

          <OptionUpdate
            valUpdate={statusUpdate}
            options={options}
            setValUpdate={setStatusUpdate}
            status={status}
          />
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-emerald-100 bg-emerald-50/10 px-6 py-4 ">
          <button
            onClick={onCancel}
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            <IoClose className="h-5 w-5 text-slate-500" />
            Batalkan
          </button>

          <DialogSimpleUse
            textSubmit={"Konfirmasi Update"}
            desc={`Apakah Anda Yakin Ingin Mengupdate Status Milik ${userName} Menjadi ${statusUpdate}`}
            title={"Konfirmasi Update Status"}
            onSucsess={handleUpdate}
            btnText={"Update Status Booking"}
          />
        </div>
      </div>
    </div>
  );
}
