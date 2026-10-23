import { Field,  FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";



export default function Note({ register }) {
  return (
    <Field>
      <FieldLabel htmlFor="textarea-message">Pesan Dokumentasi</FieldLabel>

      <Textarea
        id="textarea-message"
        className={"text-sm"}
        placeholder="Masukan Pesan Dokumentasi Disini."
        {...register}
      />
    </Field>
  );
}
