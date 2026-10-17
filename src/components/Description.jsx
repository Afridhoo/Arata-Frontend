import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

export default function Description({ sizeSmall, title, defaults, ...register }) {

  return (
    <div className={`space-y-4 mt-5 ${sizeSmall && 'max-w-sm'}`}>
      <Field>
        <FieldLabel htmlFor="textarea-message">
          Masukan Detail {title}
        </FieldLabel>
        <FieldDescription>
           {title} Berguna Menambah Detail Tour 
        </FieldDescription>
        <Textarea
          id="textarea-message"
          placeholder="Masukan Detail Disini"
          defaultValue={defaults}
          {...register}
        />
      </Field>
    </div>
  );
}
