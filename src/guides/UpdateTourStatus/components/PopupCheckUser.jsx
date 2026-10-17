import { useForm } from "react-hook-form";
import { IoClose, IoMail, IoCall, IoTicket, IoPeople } from "react-icons/io5";
import UserCompleted from "./UserCompleted";
import { FiCheckCircle, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  LucideCheck,
  LucideUserCheck2,
  LucideUserRoundPlus,
  LucideUsers2,
  LucideUserX2,
} from "lucide-react";
import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";

export default function PopupCheckUser({
  valueUser,
  onCancel,
  onSave,
  documentation,
  tourId,
}) {
  const { register, handleSubmit, watch } = useForm();
  const totalUser = watch("user");

  const { userBooking } = documentation || {};

  const getTotals = valueUser?.reduce((acc, cur) => acc + cur.quantity, 0);

  const valueCheckbox = totalUser?.flatMap((el) => el);

  const getTotalsInCompleted = valueCheckbox?.filter(
    (el) => el === false,
  ).length;
  const getTotalsTicket = valueCheckbox?.filter((el) => el !== false).length;

  function valueSubmit(data) {
    const { user } = data;

    const userBookingId = valueUser?.map((el) => el._id);

    const formatUser = user.map((id, idx) => ({
      userId: valueUser[idx].idUser,
      totalUserCompleted: id.filter((el) => el !== false).length,
      totalUserIncompleted: id.filter((el) => el === false).length,
      statusUserBooking: !id.includes(false) ? "completed" : "incompleted",
    }));

    const formatFinal = { tourId, userBookingId, userBooking: formatUser };

    onSave(formatFinal);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(valueSubmit)}
        className="w-full max-w-4xl transform overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-2xl transition-all flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="border-b border-emerald-100 bg-emerald-50/30 px-6 py-4 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <IoPeople className="h-5 w-5 " />
                Daftar Peserta Wisata
              </h3>
              <p className="mt-1 text-sm font-bold text-gray-600">
                Informasi detail peserta yang telah melakukan booking untuk
                perjalanan ini.
              </p>
            </div>
            <button
              onClick={onCancel}
              type="button"
              className="rounded-lg p-1.5 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-800 transition-colors cursor-pointer"
            >
              <IoClose className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content (Scrollable List) */}
        <div className="p-6 overflow-y-auto flex-1 ">
          {/* Summary Banner */}
          <div className="flex justify-between items-center   p-4 ">
            <BadgeSimpleUse
              desc={`Total Peserta Terdaftar ${getTotals}`}
              variant={"default"}
              style={"p-4 py-3"}
              icon={<LucideUsers2 />}
            />

            <div className="grid gap-2">
              <BadgeSimpleUse
                desc={`Tiket Disiapkan ${getTotalsTicket}`}
                variant={"outline"}
                style={"p-3 border-gray-700"}
                icon={<LucideUserRoundPlus />}
              />
              {getTotalsInCompleted === 0 ? (
                <BadgeSimpleUse
                  desc={"Peserta Hadir Semua"}
                  style={"p-3 bg-green-600 text-white"}
                  icon={<LucideUserCheck2 />}
                />
              ) : (
                <BadgeSimpleUse
                  desc={`Peserta Tidak Hadir ${getTotalsInCompleted}`}
                  style={"p-3 bg-red-700 text-white"}
                  icon={<LucideUserX2 />}
                />
              )}
            </div>
          </div>

          <div className=" flex  items-start gap-5 w-fit">
            {valueUser.map((user, idx) => {
              const getUserCount = new Array(user.quantity).fill(0);
              const getUserIsAcc = userBooking?.find(
                (el) => el.userId === user.idUser,
              );

              return (
                <div
                  key={idx}
                  className=" flex flex-col justify-between p-5 rounded-xl border border-slate-200 bg-white overflow-y-auto max-w-[250px] transition-all duration-200"
                >
                  {/* Upper: User Profile Info */}
                  <div className="flex items-start gap-4">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        className="w-12 h-12 rounded-full object-cover border-2 border-emerald-100 shadow-sm shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 shadow-sm text-emerald-600 font-bold text-lg">
                        {(user.name || "?").charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="space-y-1 min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-slate-800 truncate">
                        {user.name || "Tanpa Nama"}
                      </h4>

                      <div className="space-y-1 text-xs text-slate-500">
                        {user.email && (
                          <span className="flex items-center gap-1.5 truncate hover:text-emerald-600 transition-colors">
                            <IoMail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{user.email}</span>
                          </span>
                        )}
                        {user.telphone && (
                          <span className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors">
                            <IoCall className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span>{user.telphone}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Lower: Checkbox checklist for tickets */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Absensi Kehadiran ({user.quantity} User)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getUserCount.map((_, pIdx) => (
                        <label
                          key={pIdx}
                          className="flex items-center gap-2 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-lg px-2.5 py-1.5 cursor-pointer transition-all select-none text-xs text-slate-600 font-medium"
                        >
                          <input
                            type="checkbox"
                            value={`${user.idUser}`}
                            className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                            {...register(`user.${idx}.${pIdx}`)}
                            defaultChecked={
                              pIdx < getUserIsAcc?.totalUserCompleted
                            }
                          />
                          <span>User{pIdx + 1}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-emerald-100 bg-emerald-50/10 px-6 py-4 shrink-0">
          <Button
            type="submit"
            className="cursor-pointer flex items-center gap-2"
          >
            <LucideCheck />
            Kirim Data
          </Button>
        </div>
      </form>
    </div>
  );
}
