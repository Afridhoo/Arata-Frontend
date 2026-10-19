import { UseGetMe } from "../../auth/hooks/useAuth";
import {
  FiUser,
  FiMail,
  FiShield,
  FiCalendar,
  FiMapPin,
  FiStar,
  FiPhone,
  FiUserCheck,
  FiList,
  FiActivity,
} from "react-icons/fi";
import { formatDateId } from "../../../utils/convertDate";

import { UseGetStatsMe } from "../hooks/UseUser";
import StatCard from "../components/StatCard";
import InfoRow from "../components/InfoRow";
import AvatarSimpleUse from "@/components/AvatarSimpleUse";
import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import NewLoading from "@/components/loading/NewLoading";
import { UserNotExist } from "@/components/UserNotExist";
import { useAuth } from "@/utils/AuthContext";

export default function Profil() {
  const { isUserNotLogin, user: User } = useAuth();
  const { data: StatsUser, isPending: LoadStats } = UseGetStatsMe({
    enabled: isUserNotLogin,
  });

  if (!isUserNotLogin) return <UserNotExist />;
  if (LoadStats) return <NewLoading />;

  const { createAt, name, photo, email, role, telphone, isActiveTrip } =
    User || {};
  const { booking, review, guideReview, getGuideHandle } = StatsUser || {};

  const joinDate = createAt ? formatDateId(createAt , true) : "—";

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header Profile Hero Card */}
      <header className=" md:w-full w-40 m-auto mb-5 relative overflow-hidden rounded-3xl bg-white p-6  border border-[#e5e5e7] shadow-xs">
        <div className=" flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="shrink-0 p-1 rounded-full bg-[#f5f5f7] border border-gray-200/80">
            <AvatarSimpleUse photo={photo} isActive={true} size="lg" />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className=" text-xs font-semibold tracking-wider text-[#6e6e73] uppercase mb-1">
                  Profil Saya
                </p>
                <h1 className="md:text-2xl text-sm font-semibold text-[#1d1d1f] tracking-tight">
                  {name}
                </h1>
              </div>

              {/* Role & Status Badges */}
              <div className=" hidden md:flex flex-wrap items-center justify-center sm:justify-end gap-2">
                <BadgeSimpleUse
                  desc={role ? role.toUpperCase() : "—"}
                  style="bg-[#1d1d1f] text-white hover:bg-black font-medium md:px-3.5 md:py-1 rounded-full text-xs"
                />
                <BadgeSimpleUse
                  desc={`Bergabung : ${joinDate}`}
                  variant="outline"
                  style="bg-[#f5f5f7] border-gray-200 text-[#6e6e73] font-medium px-3.5 py-1 rounded-full text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          icon={<FiMapPin className="text-base text-[#1d1d1f]" />}
          label="Tour Diikuti"
          value={booking || getGuideHandle || ""}
        />
        <StatCard
          icon={<FiStar className="text-base text-[#1d1d1f]" />}
          label="Review Tour"
          value={review ?? "—"}
        />
        <StatCard
          icon={<FiUserCheck className="text-base text-[#1d1d1f]" />}
          label="Review Pemandu"
          value={guideReview ?? "—"}
          small
        />
        <StatCard
          icon={<FiActivity className="text-base text-[#1d1d1f]" />}
          label="Status Tour"
          value={isActiveTrip ? "Sedang Berjalan" : "Tidak Ada Tour"}
          small
        />
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e5e5e7] shadow-xs">
          <div className="flex items-center gap-3.5 pb-4 mb-5 border-b border-gray-200/80">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f5f5f7] text-[#1d1d1f]">
              <FiUser className="text-lg" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-[#1d1d1f] tracking-tight">
                Informasi Pribadi
              </h2>
              <p className="text-xs text-[#6e6e73]">
                Detail data identitas akun
              </p>
            </div>
          </div>

          <div className="space-y-3 ">
            <InfoRow icon={<FiUser />} label="Nama Lengkap" value={name} />
            <InfoRow icon={<FiMail />} label="Alamat Email" value={email} />
            <InfoRow
              icon={<FiPhone />}
              label="Nomor Telepon"
              value={telphone}
            />
            <InfoRow
              icon={<FiCalendar />}
              label="Tanggal Terdaftar"
              value={joinDate}
            />
          </div>
        </div>

        {/* Information Section 2: Statistik & Status Akun */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e5e5e7] shadow-xs">
          <div className="flex items-center gap-3.5 pb-4 mb-5 border-b border-gray-200/80">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f5f5f7] text-[#1d1d1f]">
              <FiList className="text-lg" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-[#1d1d1f] tracking-tight">
                Statistik Akun
              </h2>
              <p className="text-xs text-[#6e6e73]">
                Ringkasan peran dan aktivitas
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <InfoRow
              icon={<FiShield />}
              label="Role Akun"
              value={role ? role.toUpperCase() : "—"}
            />
            <InfoRow
              icon={<FiMapPin />}
              label="Status Perjalanan Tour"
              value={
                isActiveTrip ? "Sedang Berjalan" : "Tidak Ada Perjalanan Aktif"
              }
            />
            <InfoRow
              icon={<FiUserCheck />}
              label="Review Pemandu"
              value={guideReview || "—"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
