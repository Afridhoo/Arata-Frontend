import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function FileImgUpload({
  register,

  noMultiUpload,
}) {
  return (
    <Field>
      <FieldLabel htmlFor="picture">Input Gambar Disini</FieldLabel>
      <Input
        id="picture"
        accept="image/*"
        multiple={noMultiUpload ? false : true}
        type="file"
        capture="environment"
        {...register}
      />
      <FieldDescription>Silahkan Pilih Gambar</FieldDescription>
    </Field>
  );
}
