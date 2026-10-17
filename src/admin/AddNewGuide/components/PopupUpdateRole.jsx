import {
  IoClose,
  IoCheckmark,
  IoPerson,
  IoMail,
  IoShieldHalf,
  IoCalendar,
} from "react-icons/io5";
import { formatDateId } from "../../../utils/convertDate";
import { FiArrowDown } from "react-icons/fi";
import { useState } from "react";
import AvatarSimpleUse from "@/components/AvatarSimpleUse";
import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import { LucideUserCheck2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogSimpleUse } from "@/components/DialogSimpleUse";

export default function PopupUpdateRole({ valueUser, onCancel, onSave }) {
  const { name, email, role, photo, createAt, _id, active } = valueUser || {};
  const valOptions = ["user", "guide", "admin", "nonaktif"];
  const [newRole, setRole] = useState(role || "user");

  function handleSave() {
    const value = { id: _id, newRole };
    onSave(value);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md transform overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl transition-all">
        {/* Header */}
        <div className="border-b border-gray-100 bg-gray-50/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Update Role Pengguna
              </h3>
              <p className="mt-1 text-xs text-gray-700">
                Ubah tingkat akses dan peranan akun pengguna ini.
              </p>
            </div>
            <button
              onClick={onCancel}
              className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors cursor-pointer"
            >
              <IoClose className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* User Profile Summary */}
          <div className="flex items-center gap-4 border border-gray-100 rounded-xl bg-gray-50/20 p-4">
            <AvatarSimpleUse photo={photo} isActive={active} />

            <div className="flex-1 min-w-0">
              <h4 className="text-base font-bold text-gray-950 truncate">
                {name || "Nama Pengguna"}
              </h4>
              <p className="text-xs text-slate-500 truncate   mt-0.5">
                {email || "email@domain.com"}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <BadgeSimpleUse
                  desc={role}
                  icon={<LucideUserCheck2 />}
                  variant={"default"}
                />
                <BadgeSimpleUse
                  desc={formatDateId(createAt, true)}
                  icon={<LucideUserCheck2 />}
                  variant={"outline"}
                />
              </div>
            </div>
          </div>

          {/* Role Selection Dropdown */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800">
              Pilih Role Baru
            </label>
            <div className="relative">
              <select
                value={newRole}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-950 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all appearance-none cursor-pointer"
              >
                {valOptions.map((el, id) => (
                  <option key={id} value={el?.toLowerCase()}>
                    {el.toUpperCase()}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-600">
                <FiArrowDown />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/10 px-6 py-4">
          <Button
            onClick={onCancel}
            type="button"
            variant="outline"
            className={"cursor-pointer"}
          >
            Batalkan
          </Button>

          <DialogSimpleUse
            btnText={"Update Role"}
            onSucsess={handleSave}
            title={`Update Role ${name}`}
            desc={"Apakah Anda Yakin Ingin Mengupdate Rol Akun Ini ?"}
          />
        </div>
      </div>
    </div>
  );
}
