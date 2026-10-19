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
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { BadgeSimpleUse } from "./BadgeSimpleUse";
import { formatDateId } from "@/utils/convertDate";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useIsMobile } from "@/hooks/use-mobile";

export function DrawerSimpelUse({
  setValue,
  RenderValue,
  title,
  description,
  buttonText,
  isActiveTripTour,
  icon,
  isActiveCoordinates,
  isFinishTour = false,
  noPt,
}) {
  const [open, setOpen] = React.useState(false);
  const mobileCheck = useIsMobile();

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      swipeDirection={mobileCheck ? "down" : "right"}
    >
      <DrawerTrigger
        render={
          <Button size="lg" className="cursor-pointer">
            {buttonText} {icon}
          </Button>
        }
      />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className={`${!noPt && "pt-20"}`}>{title}</DrawerTitle>

          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 scroll-fade overflow-y-auto p-4">
          <RadioGroup
            value={isActiveCoordinates}
            onValueChange={RenderValue}
            className="gap-2"
          >
            {RenderValue.map((el, idx) => (
              <div key={idx} onClick={() => setValue(el.coordinates, el._id)}>
                <FieldLabel className="cursor-pointer">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle className="flex items-center gap-2 ">
                        {el.description}
                      </FieldTitle>
                      <FieldDescription
                        className={mobileCheck && "max-w-40 truncate"}
                      >
                        {el.address}
                      </FieldDescription>
                      <FieldDescription>
                        <BadgeSimpleUse
                          variant={"outline"}
                          style={"mt-3"}
                          desc={`${formatDateId(el.date?.from, true)} - 
                          ${formatDateId(el.date?.to, true)}
                            `}
                        />
                      </FieldDescription>
                    </FieldContent>

                    {isFinishTour && (
                      <BadgeSimpleUse
                        desc={"Selesai"}
                        style={"bg-green-600 text-white"}
                      />
                    )}

                    {isActiveTripTour && !isFinishTour && (
                      <div>
                        {el.status === "ongoing" && (
                          <BadgeSimpleUse
                            desc={"Dituju"}
                            style={"bg-orange-600 text-white"}
                          />
                        )}
                        {el.status === "finished" && (
                          <BadgeSimpleUse
                            desc={"Selesai"}
                            style={"bg-green-600 text-white"}
                          />
                        )}
                        {el.status === "pending" && (
                          <BadgeSimpleUse desc={"Pending"} />
                        )}
                      </div>
                    )}
                    <RadioGroupItem value={el.coordinates} />
                  </Field>
                </FieldLabel>
              </div>
            ))}
          </RadioGroup>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
