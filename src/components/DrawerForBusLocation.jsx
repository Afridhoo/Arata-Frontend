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
import calcDistanceDuration from "@/utils/calcDistanceDuration";
import { Badge } from "./ui/badge";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useIsMobile } from "@/hooks/use-mobile";

export function DrawerForBusLocation({
  Line,
  title,
  buttonText,
  icon,
  handleWayPoints,

  noPadding,
  isActive,
}) {
  const [open, setOpen] = React.useState(false);

  const { coordinatesBus } = Line;
  const { segment } = coordinatesBus;
  const { distance, duration, steps } = segment;
  const calcDurationRute =
    distance && duration && calcDistanceDuration({ distance, duration });

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
      <DrawerContent className={"md:pb-0 pb-20"}>
        <DrawerHeader>
          <DrawerTitle className={!noPadding && !mobileCheck && "pt-20"}>
            Perjalanan Ke Lokasi Wisata {title}
          </DrawerTitle>
          <DrawerDescription>
            Lama Perjalanan Memakan Waktu {calcDurationRute?.duration}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 scroll-fade max-h-[250px] md:max-h-full  overflow-y-auto p-4">
          <RadioGroup value={isActive} onValueChange={steps} className="gap-2">
            {steps.map((el, idx) => {
              const calcTime = calcDistanceDuration({
                distance: el?.distance,
                duration: el?.duration,
              });

              return (
                <div onClick={() => handleWayPoints(el.way_points)}>
                  <FieldLabel className="cursor-pointer">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <Badge variant="secondary">{calcTime.duration}</Badge>
                        <FieldTitle className="flex items-center gap-2">
                          {el.name}
                        </FieldTitle>
                        <FieldDescription>{el.instruction}</FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value={el.way_points} />
                    </Field>
                  </FieldLabel>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
