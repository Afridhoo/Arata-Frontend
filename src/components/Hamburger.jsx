"use client";

import * as React from "react";
import { toast } from "sonner";

import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  LucideBell,
  LucideHeart,
  LucideHistory,
  LucideListCollapse,
  LucideLogOut,
  LucideUserRoundCog,
  LucideUsers2,
} from "lucide-react";
import { useAuth } from "@/utils/AuthContext";
import AvatarSimpleUse from "./AvatarSimpleUse";
import { BadgeSimpleUse } from "./BadgeSimpleUse";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const deliveryTimes = [
  {
    value: "/AccountMe",
    label: "Halaman Profil",
    icon: <LucideUsers2 />,
  },
  {
    value: "/notification",
    label: "Notifikasi",
    icon: <LucideBell />,
  },
  {
    value: "/favorite",
    label: "Favorite",
    icon: <LucideHeart />,
  },
  {
    value: "/services",
    label: "Hubungi Admin",
    icon: <LucideUserRoundCog />,
  },
  {
    value: "/tripMe",
    label: "Histori Perjalanan",
    icon: <LucideHistory />,
  },

];

export default function Hamburger() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { name, photo } = user || {};

  function handleNavigate(path) {
    navigate(path);
    setOpen(false);
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={isMobile}
      swipeDirection={"left"}
    >
      <DrawerTrigger
        render={
          <Button variant="secondary">
            <LucideListCollapse
              size={12}
              className={`transition-all ${open ? "-rotate-6" : "rotate-0"}`}
            />
          </Button>
        }
      />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <AvatarSimpleUse photo={photo} size={"small"} isActive={true} />
            Haloo {name || "User"}
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 scroll-fade overflow-y-auto p-4">
          <RadioGroup className="gap-2">
            {deliveryTimes.map((time, idx) => (
              <FieldLabel key={idx} onClick={() => handleNavigate(time.value)}>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle className="flex items-center gap-2 ">
                      <BadgeSimpleUse variant={"outline"} icon={time.icon} />
                      {time.label}
                    </FieldTitle>
                  </FieldContent>
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
