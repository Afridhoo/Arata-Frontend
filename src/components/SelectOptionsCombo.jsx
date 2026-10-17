"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

export function SelectOptionsCombo({
  value,
  onChange,
  idx,
  type,
  defaultValue,
}) {
  return (
    <Combobox
      items={value}
      itemToStringValue={(items) => items.label}
      onValueChange={(e) => onChange({ value: e, index: idx, type })}
      defaultValue={defaultValue}
    >
      <ComboboxInput placeholder="Cari Kategori" />
      <ComboboxContent>
        <ComboboxEmpty>No countries found.</ComboboxEmpty>
        <ComboboxList defaultValue={defaultValue}>
          {(value) => (
            <ComboboxItem
              key={value._id}
              value={value}
              className={"cursor-pointer"}
            >
              <Item size="xs" className="p-0">
                <ItemContent>
                  <ItemTitle className="whitespace-nowrap ">
                    {value.label}
                  </ItemTitle>
                  <ItemDescription>{value.desc}</ItemDescription>
                </ItemContent>
              </Item>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
