import { BadgeSimpleUse } from "./BadgeSimpleUse";

export default function BadgePerStatusLocations({ status, style, renderText }) {
  return (
    <div className={style}>
      {status === "ongoing" && (
        <BadgeSimpleUse
          desc={renderText || "Dituju"}
          style={"bg-orange-600 text-white"}
        />
      )}
      {status === "finished" && (
        <BadgeSimpleUse
          desc={renderText || "Selesai"}
          style={"bg-green-600 text-white"}
        />
      )}
      {status === "pending" && (
        <BadgeSimpleUse desc={renderText || "Pending"} />
      )}
    </div>
  );
}
