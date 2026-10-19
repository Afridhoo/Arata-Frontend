import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Field, FieldLabel } from "./ui/field";

export default function InputUseForm({
  label,
  Icon,
  placeholder,
  type,
  defaults = null,
  ...props
}) {
  return (
    <Field className="md:max-w-sm">
      <FieldLabel htmlFor="inline-start-input">{label}</FieldLabel>
      <InputGroup >
        <InputGroupInput
          placeholder={placeholder}
          type={type}
          defaultValue={defaults}
          accept={type === "file" && "image/*"}
          {...props}
        />
        <InputGroupAddon>
          <Icon />
        </InputGroupAddon>
        <InputGroupAddon className={"hidden md:block"} align="inline-end">{label}</InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
