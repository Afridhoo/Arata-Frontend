import { Badge } from "@/components/ui/badge";

export function BadgeSimpleUse({ desc, icon, variant, handleDelete, style }) {
  
  return (
    <div
      onClick={() => handleDelete && handleDelete()}
      className={`flex flex-wrap gap-2 w-fit ${handleDelete && "cursor-pointer"}`}
    >
      <Badge variant={variant || "secondary"} className={style }>
        {icon}
        {desc}
      </Badge>
    </div>
  );
}
