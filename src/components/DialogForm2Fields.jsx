import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function DialogForm2Fields({
  textRender,
  handleSubmit,
  titleForm,
  descForm,
  fields = [],
  selectOptions = [],
  defaultValueSelect,
  variantBtn,
  titleSelect,
}) {
  const { handleSubmit: handleSubmitUseForm, register } = useForm();

  function prosesSubmit(value) {
    const val = Object.values(value);

    const checkEl = val?.every((el) => el);
    if (!checkEl)
      return toast.error("Input Ada Yang Belum Terisi", {
        description: "Silahkan Isi Semua Input",
      });

    handleSubmit(value);
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            className={"cursor-pointer"}
            variant={variantBtn || "default"}
          >
            {textRender}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmitUseForm(prosesSubmit)}>
          <DialogHeader>
            <DialogTitle>{titleForm}</DialogTitle>
            <DialogDescription>{descForm}</DialogDescription>
          </DialogHeader>
          <FieldGroup className={"mt-2"}>
            {fields?.map((el) => (
              <Field className={"mb-1"}>
                <Label>{el.name}</Label>
                <Input
                  defaultValue={el.default && el.default}
                  type={el.type}
                  placeholder={el.placeholder && el.placeholder}
                  {...register(el.register)}
                />
              </Field>
            ))}
          </FieldGroup>

          {selectOptions?.length > 0 && (
            <div className="-mt-6 mb-2">
              
                <Label>{titleSelect}</Label>
                <select
                  defaultValue={defaultValueSelect}
                  className="w-full rounded-md border mt-2 p-2 cursor-pointer"
                  {...register("selectOptions")}
                >
                  {selectOptions?.map((s) => (
                    <option
                      key={s.value}
                      value={s.value}
                      className="bg-gray-200 text-gray-700 py-1 font-semibold"
                    >
                      {s.label}
                    </option>
                  ))}
                </select>
            </div>
          )}

          <DialogFooter>
            <DialogClose render={<Button variant="outline">Batal</Button>} />
            <Button className={"cursor-pointer"} type="submit">
              Simpan Data
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
