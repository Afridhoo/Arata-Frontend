import { BadgeSimpleUse } from "./BadgeSimpleUse";

export default function Headline({ Icon, headline, role }) {
  return (
    <div className="gap-3 border-b border-gray-100 grid ">
      <BadgeSimpleUse desc={`Manage  ${headline}.`} variant={"default"} />

      <h1 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
        <Icon />
        {headline} {role}
      </h1>
    </div>
  );
}
