import {
  IoCall,
  IoLocationOutline,
  IoMail,
  IoPersonCircle,
} from "react-icons/io5";

export default function RenderSameGuide({ value, idLogin }) {
  return (
    <div>
      {value.length > 0 &&
        value.map((guide, idx) => {
          const { name, email, photo, telephone, _id } =
            guide.guideIdentity || {};

          const { destHandle } = guide;

          return (
            <div
              key={guide._id || idx}
              className="flex flex-col bg-white rounded-2xl border border-emerald-100/70 hover:border-emerald-300 hover:shadow-md transition-all duration-300 p-6 gap-5 mb-4 shadow-sm"
            >
              <div className="flex gap-4 items-center">
                {photo ? (
                  <img
                    src={photo}
                    alt={name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-emerald-200 shadow-sm shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-emerald-200 shrink-0 text-emerald-700 font-bold text-xl">
                    {name.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-emerald-950 truncate mb-1">
                      {name}
                    </h4>
                    {idLogin === _id && (
                      <p className="text-xs text-white font-semibold w-fit px-2 py-1 rounded-4xl bg-emerald-600 flex items-center gap-1.5">
                        <IoPersonCircle className="h-4 w-4 text-white shrink-0" />
                        <span className="truncate">Anda</span>
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-emerald-800 flex items-center gap-1.5">
                      <IoMail className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{email}</span>
                    </p>
                    {telephone && (
                      <p className="text-xs text-emerald-800 flex items-center gap-1.5">
                        <IoCall className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>{telephone}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {destHandle.length > 0 && (
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-xs font-bold text-emerald-900 mb-3 flex items-center gap-1">
                    <IoLocationOutline className="h-4 w-4 text-emerald-600" />
                    Lokasi Penugasan
                  </p>
                  <div className="space-y-2.5">
                    {destHandle.map((el, locIdx) => {
                      const { address, description, image } = el;

                      return (
                        <div
                          key={locIdx}
                          className="flex items-center gap-3 p-3 bg-emerald-50/30 rounded-xl border border-emerald-100/50 hover:bg-emerald-50/50 transition-colors"
                        >
                          <img
                            className="w-12 h-12 rounded-lg object-cover shadow-sm shrink-0 bg-slate-100"
                            src={image}
                            alt={description}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-emerald-950 leading-tight">
                              {description}
                            </p>
                            <p className="text-[11px] text-emerald-700/90 mt-0.5 leading-snug truncate">
                              {address}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
