import React from "react";

export default function LabelHeader({ title, desc }) {
  return (
    <div>
      <h2 className="font-semibold uppercase tracking-wider text-[13px]  text-gray-400 flex items-center gap-3 mb-1">
        <span>{title}</span>
      </h2>
      <span className="text-[26px] font-bold">{desc}</span>
    </div>
  );
}
