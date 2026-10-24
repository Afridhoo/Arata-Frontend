import { UseGetNotif } from "../hooks/useNotification";
import HeaderNotification from "../components/NotificationComponents/HeaderNotification";
import IsRead from "../components/NotificationComponents/IsRead";
import { getNotifStyle } from "../components/getNotifStyle";
import MainNotification from "../components/NotificationComponents/MainNotification";

import { UserNotExist } from "@/components/UserNotExist";

import { useAuth } from "@/utils/AuthContext";
import NewLoading from "@/components/loading/NewLoading";

export default function Notification() {
  const { data: Notif, isPending } = UseGetNotif();
  const { isUserNotLogin } = useAuth();

  if (!isUserNotLogin) return <UserNotExist />;
  if (isPending) return <NewLoading />;

  const getLength = Notif?.filter((el) => !el.isRead)?.length;

  Notif.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const getBooking = Notif?.map((el) => el.booking || []);

  if (getBooking.length === 0) return <p>sw</p>;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <HeaderNotification notificationsList={getLength} />

      <div className="flex flex-col gap-4">
        {Notif.map((item, i) => {
          const { bgColor, borderColor, iconColor, Icon } = getNotifStyle(
            getBooking[i]?.status,
          );

          return (
            <div
              key={item._id || item.id}
              className={`${bgColor} rounded-2xl p-5 border ${borderColor} flex justify-between gap-4  duration-300 `}
            >
              <MainNotification
                bookings={getBooking?.[i]}
                iconColor={iconColor}
                item={item}
                Icon={Icon}
              />
              <div>{!item.isRead && <IsRead />}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
