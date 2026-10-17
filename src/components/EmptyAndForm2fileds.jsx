import { DialogForm2Fields } from "./DialogForm2Fields";
import { EmptySimpleUse } from "./EmptySimpleUse";

export default function EmptyAndForm2fileds({
  titleEmpty,
  descEmpty,
  iconEmpty,
  textRenderForm,
  handleSubmit,
  titleForm,
  descForm,
  fields,
}) {
  return (
    <div className="grid items-center justify-center  ">
      <EmptySimpleUse title={titleEmpty} desc={descEmpty} icon={iconEmpty} />
      <span className="m-auto -mt-6">
        <DialogForm2Fields
          textRender={textRenderForm}
          handleSubmit={handleSubmit}
          titleForm={titleForm}
          descForm={descForm}
          fields={fields}
        />
      </span>
    </div>
  );
}
