import { Button } from "@/components/ui/button";

export default function IsActionPerRoleActive({
  setIsActive,
  text,
  Icon,
 
}) {
  return (
    <div>
      <Button
        onClick={setIsActive}
        className={`cursor-pointer font-semibold text-sm  flex items-center gap-2 p-2 rounded-lg`}
      >
        <Icon className="w-4 h-4" />
        {text}
      </Button>
    </div>
  );
}
