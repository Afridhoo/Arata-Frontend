import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function AvatarPlus({ img, icon }) {
  return (
    <Avatar size="lg">
      <AvatarImage src={img} />
      <AvatarFallback>{img}</AvatarFallback>
      {icon && <AvatarBadge>{icon}</AvatarBadge>}
    </Avatar>
  );
}
