import HoverCardUse from "@/components/HoverCardUse";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";

export default function CheckBoxTours({
  categories,
  checked,
  handleChecked,
  title,
}) {
  return (
    <div>
      <Label className={"mb-4 mt-5"}>{title}</Label>
      <div className="grid grid-cols-2 gap-2">
        {categories?.map((el) => (
          <Field orientation="horizontal">
            <Checkbox
              className={"cursor-pointer"}
              defaultChecked={checked?.some((c) => c._id === el._id)}
              onCheckedChange={() =>
                handleChecked({
                  _id: el._id,
                  typeCategories: el.typeCategories,
                  categoriesTour: el.categoriesTour,
                })
              }
            />

            <HoverCardUse
              Render={
                <FieldContent>
                  <FieldLabel className={"text-gray-600 text-[13px] group"}>
                    {el?.categoriesTour}
                  </FieldLabel>
                </FieldContent>
              }
              RenderText={el.description}
            />
          </Field>
        ))}
      </div>
    </div>
  );
}
