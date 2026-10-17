import { LucideUser2 } from "lucide-react";
import { BadgeSimpleUse } from "../BadgeSimpleUse";

export default function InfoUser({ role, name }) {
  return (
    <div className="overflow-hidden flex items-center gap-4">
      <p className="text-gray-800 font-bold text-lg">
        {name || "Guest"}
      </p>
      <div >
        <BadgeSimpleUse desc={role} variant={"outline"} icon={<LucideUser2 size={12}/>}/>
      </div>

    </div>
  );
}
