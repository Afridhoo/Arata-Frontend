import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import { Button } from "@/components/ui/button";
import { LucideMapPinCheck } from "lucide-react";

export default function TriggerMap({ setMapIsActive, label }) {
  return (
    <div className="grid gap-3">
      <BadgeSimpleUse style={" p-2 bg-gray-200"} variant={"outline"} desc={`${label} Lokasi Tour`} icon={<LucideMapPinCheck />} />

      <Button
        className={"cursor-pointer"}
        onClick={() => setMapIsActive(true)}
        type="button"
      >
        Buka Map
      </Button>
    </div>
  );
}
