import { LucideUser2 } from "lucide-react";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function AvatarSimpleUse({ photo, isActive, size, noBage }) {
  return (
    <Avatar size={size || "lg"}>
      <AvatarImage src={photo} className={` ${!isActive && "grayscale"}`} />
      <AvatarFallback>
        <LucideUser2 />
      </AvatarFallback>
      {!noBage && (
        <AvatarBadge
          className={`${isActive ? "bg-green-600" : "bg-gray-700 "}`}
        />
      )}
    </Avatar>
  );
}
