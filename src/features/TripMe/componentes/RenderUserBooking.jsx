import { FaUsers, FaWhatsapp } from "react-icons/fa";

export default function RenderUserBooking({ dataBoking }) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border  border-gray-100 ">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <FaUsers className="text-green-600" />
          <span>Rekan Perjalanan</span>
        </h2>

        <p className="text-xs text-slate-400 mb-6">
          Pengguna lain yang terdaftar dalam grup tour yang sama dengan Anda:
        </p>

        {dataBoking && dataBoking.length > 0 ? (
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            {dataBoking.map((el, idx) => {
              const { dataUser: user } = el;
              const {
                statusUserBooking,
                totalUserCompleted,
                totalUserIncompleted,
              } = el;
              const chekingStats = statusUserBooking === "completed";
              return (
                <div
                  key={idx}
                  className="flex flex-col p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={user.photo}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 text-sm truncate">
                        {user.name}
                      </h4>

                      <p className="text-xs text-slate-400 truncate flex items-center gap-1 mt-0.5">
                        <FaWhatsapp className="text-[10px]" />{" "}
                        {user.telphone || "Nomor Tidak Terdaftar"}
                      </p>
                    </div>
                  </div>

                  {totalUserCompleted && (
                    <div className="mt-2.5 pt-2 border-t border-slate-150 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Status Booking:</span>
                      <span
                        className={`font-semibold flex items-center gap-1 px-2 py-0.5 rounded-full ${
                          chekingStats
                            ? "bg-green-50 text-green-700 border border-green-150"
                            : "bg-amber-50 text-amber-700 border border-amber-150"
                        }`}
                      >
                        {totalUserCompleted} Orang
                      </span>
                      {!chekingStats && (
                        <span className='font-semibold flex items-center gap-1 px-2 py-0.5 rounded-full "bg-amber-50 text-red-700 border border-amber-150'>
                          {totalUserIncompleted} Orang Tidak Ikut
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-400 text-sm">
              Belum ada rekan perjalanan lain dalam grup Anda saat ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
