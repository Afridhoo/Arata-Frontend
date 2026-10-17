import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CheckboxDateTour({
  label,
  value = [],
  checked,
  setChecked
}) {

function handleOnChangeFilter(value) {
    const { check, text } = value;
    const checkData = checked.some((s) => s.check === check && s.text !== text);
    const checkSameChecked = checked.some(
      (s) => s.check === check && s.text === text,
    );

    if (checkSameChecked) setChecked((s) => s.filter((a) => a.text !== text));

    if (checkData)
      setChecked((s) => s.map((x) => (x.check === check ? { ...value } : x)));

    if (!checkData && !checkSameChecked) setChecked((s) => [...s, value]);
  }


  return (
    <div className="flex flex-col gap-3">
      <Label>{label}</Label>
      <div className="grid grid-cols-2 ">
        {value?.map((s) => (
          <div className="flex items-center gap-2 mb-3">
            <Checkbox
              className={"cursor-pointer"}
              onCheckedChange={() => handleOnChangeFilter(s)}
              checked={checked.some((x) => x.text === s.text)}
            />
            <label className="text-sm flex items-center gap-1">
              <span>{s.text}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
