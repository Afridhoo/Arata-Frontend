import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import { formatDateId } from "@/utils/convertDate";

export default function RenderListDate({ value, title, RenderFalseVal }) {
  return (
    <span className="font-semibold text-sm  flex  gap-2 text-gray-700 mt-2">
      {title} : {value && formatDateId(value)}
      {RenderFalseVal && <BadgeSimpleUse desc={RenderFalseVal} variant={"default"} />}
    </span>
  );
}
