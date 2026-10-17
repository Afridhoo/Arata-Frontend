import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";


export default function CustomerInfo({ name, email, telphone, role }) {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-wider  ">
        Informasi Pelanggan
      </h4>
      <div className="rounded-xl border border-emerald-100 p-4 space-y-3 shadow-xs bg-emerald-50/10">
        <div>
          <span className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold">
            Nama Lengkap
          </span>
          <span className="text-sm font-semibold text-emerald-950">{name}</span>
        </div>
        <div>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
            Email
          </span>
          <span className="text-sm font-medium text-gray-900">{email}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="flex items-center gap-1.5 text-xs text-gray-700">
              No. Telepon
            </span>
            <span className="text-sm font-medium text-emerald-900 ">
              {telphone}
            </span>
          </div>
          <div className="grid gap-2">
            <span className=" text-xs text-gray-700">Role</span>

            <BadgeSimpleUse desc={role?.toUpperCase()} />
          </div>
        </div>
      </div>
    </div>
  );
}
