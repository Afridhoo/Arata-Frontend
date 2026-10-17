"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function DrawerLocationsAdmin({
  value,
  handleSaveLocation,
  status,
  handleCheckDestination,
  textRender,
  isActiveClick,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} swipeDirection="left">
      <DrawerTrigger render={<Button>{textRender}</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>List Lokasi {textRender}</DrawerTitle>
          <DrawerDescription>
            Silahkan Pilih Lokasi {textRender}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 scroll-fade overflow-y-auto p-4">
          <RadioGroup
            value={isActiveClick}
            onValueChange={value}
            className="gap-2"
          >
            {value.map((el, idx) => {
              const { name, address_line2, lat, lon, place_id } =
                el.properties || {};

              return (
                <div
                  className="cursor-pointer"
                  key={idx}
                  onClick={() => handleCheckDestination([lon, lat], place_id)}
                >
                  <Field
                    orientation="horizontal"
                    className={"p-2 border border-gray-200 rounded-lg"}
                  >
                    <FieldContent>
                      <FieldTitle className="flex items-center gap-2">
                        {name}
                      </FieldTitle>
                      <FieldDescription>{address_line2}</FieldDescription>
                      <FieldDescription className={"pt-2"}>
                        <Button
                          className={"cursor-pointer"}
                          variant="outline"
                          size="sm"
                          type="button"
                          onClick={() => handleSaveLocation(el, status)}
                        >
                          Pilih Lokasi
                        </Button>
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value={place_id} />
                  </Field>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
