import { Archive } from "lucide-react";
import { DialogUseSubmit } from "./DialogUseSubmit";
import { BadgeSimpleUse } from "./BadgeSimpleUse";

export default function ArichiveSkill({
  valueCategoriesArchive,
  handleEdit,
  textBtn,
  titlePopup,
  descPopup,
  titleMain,
  badge,
  typeBtn,
}) {
  return (
    <div className="space-y-4  pt-4 border-t border-border/40">
      <div className="flex items-center flex-wrap w-[400px]  justify-between">
        <h2 className="text-lg font-semibold   text-foreground flex items-center gap-2">
          <Archive className="w-4 h-4 text-muted-foreground" />
          <span>{titleMain}</span>
          <BadgeSimpleUse
            desc={`${valueCategoriesArchive.length} Arsip`}
            variant={"default"}
          />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {valueCategoriesArchive?.map((el, idx) => {
          const { categoriesTour, description, _id } = el;
          return (
            <div
              key={_id || idx}
              className="bg-muted/30 text-muted-foreground border border-dashed border-border/70 rounded-2xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <BadgeSimpleUse desc={badge} variant={"outline"} />
                </div>
                <h3 className="font-semibold text-lg text-foreground/80 tracking-tight line-clamp-1">
                  {categoriesTour}
                </h3>
                <p className="text-sm text-muted-foreground/80 mt-1 line-clamp-2 leading-relaxed">
                  {description || "Tidak ada deskripsi"}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-end">
                <DialogUseSubmit
                  submitData={() => handleEdit(el)}
                  textBtn={textBtn}
                  desc={`${categoriesTour} ${descPopup}`}
                  title={`${titlePopup} ${categoriesTour}`}
                  variant={"outline"}
                  typeBtn={typeBtn}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
