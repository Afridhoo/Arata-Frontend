import {
  FaCheckCircle,
  FaInfoCircle,
  FaMoneyBillWave,
  FaPlane,
} from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";

export const getNotifStyle = (message) => {
  const msg = message?.toLowerCase() || "";
  if (msg.includes("confirmed")) {
    return {
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
      iconColor: "text-green-500",
      iconBg: "bg-green-100/60",
      Icon: FaCheckCircle,
    };
  }
  if (msg.includes("finished")) {
    return {
      bgColor: "bg-green-100",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      iconBg: "bg-green-120/80",
      Icon: FaPlane,
    };
  }
  if (msg.includes("cancelled")) {
    return {
      bgColor: "bg-red-50",
      borderColor: "border-red-100",
      iconColor: "text-red-500",
      iconBg: "bg-red-100/60",
      Icon: FiXCircle,
    };
  }
  if (msg.includes("pending")) {
    return {
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-100",
      iconColor: "text-yellow-500",
      iconBg: "bg-yellow-100/60",
      Icon: FaMoneyBillWave,
    };
  }
  return {
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100/60",
    Icon: FaInfoCircle,
  };
};
