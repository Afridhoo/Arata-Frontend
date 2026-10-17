import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

export function SelectOptionsSimple({ value, defaults = null, ...props }) {
  return (
    <NativeSelect defaultValue={defaults} {...props}>
      {value?.map((el) => (
        <NativeSelectOption value={el.value}>{el.label}</NativeSelectOption>
      ))}
    </NativeSelect>
  );
}
