import { formatDateId } from "../../../../utils/convertDate";
import { FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  UsePatchNotif,
  UseSendCoordsToAdmin,
} from "../../hooks/useNotification";
import CtaAction from "./CtaAction";
import { useState } from "react";

export default function MainNotification({ bookings, Icon, iconColor, item }) {
  const { mutate, isPending } = UsePatchNotif();
  const { mutate: sendCoords } = UseSendCoordsToAdmin();
  const { payment, status, tour, id: bookingId } = bookings;
  const { message, createdAt, _id: notifId } = item;
  const [locationMe, setLocationMe] = useState(null);

  const navigate = useNavigate();

 

  function handleLink() {
    mutate({ id: notifId });
    navigate(`/booking/${bookingId}`);
  }

  

  return (
    <div>
      <CtaAction
        Icon={Icon}
        iconColor={iconColor}
        text={status}
        handler={handleLink}
      />

      <div className="flex items-start gap-4">
        <img
          src={tour?.imageCover}
          className="w-30 h-30 rounded-lg object-cover"
        />

        <div className="grid ">
          <div className="flex items-center gap-2  text-slate-400 text-xs">
            <FaRegClock className="w-3.5 h-3.5" />
            <span>{createdAt ? formatDateId(createdAt) : "-"}</span>
          </div>
          <p className="text-black text-lg font-bold ">{tour?.name}</p>
          <p className="text-black text-sm font-semibold ">
            {payment && `Payment ${payment}`}2
          </p>
          <p className="text-slate-600 text-l mt-3 font-semibold ">{message}</p>
        </div>
      </div>
    </div>
  );
}
