import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LucideUserCheck2 } from "lucide-react";
import AvatarSimpleUse from "./AvatarSimpleUse";

import { AccordionLocationsInDrawer } from "./AccordionLocationsInDrawer";
import { DialogSimpleUse } from "./DialogSimpleUse";
import { whatsappLink } from "@/Api/ApiWhatsApp";
import { useIsMobile } from "@/hooks/use-mobile";

export function DrawerGuide({
  title,
  guide = [],
  textDisplay = "Lihat Pemandu",
}) {
  const mobileCheck = useIsMobile();

  return (
    <Drawer swipeDirection={mobileCheck ? "down" : "right"}>
      <DrawerTrigger
        render={
          <Button>
            {textDisplay} <LucideUserCheck2 />
          </Button>
        }
      />

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Pemandu Tour {title}</DrawerTitle>
          <DrawerDescription>
            Pantau Semua Pemandu & Wisata Ditugaskan{" "}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 p-4 pt-0 mt-5 overflow-x-auto max-h-full bg-muted rounded-4xl">
          <div>
            {guide?.map((el, i) => {
              const { guideIdentity, destHandle } = el || {};

              const { email, photo, name, telphone } = guideIdentity || {};

              return (
                <div className="p-4 pt-10 border-b ">
                  <div className="flex items-center gap-3">
                    {photo && (
                      <AvatarSimpleUse
                        isActive={true}
                        photo={photo}
                        noBage={true}
                      />
                    )}
                    <div className="grid gap-1">
                      <span className="font-semibold text-gray-700">
                        {name}
                      </span>
                      <span className="font-semibold text-xs">{telphone}</span>
                    </div>
                    <DialogSimpleUse
                      variant={"outline"}
                      btnText={`Hubungi Pemandu`}
                      style={"w-fit h-fit text-xs "}
                      title={"Menghubungi Pemandu"}
                      desc={`Pastikan Memang Ada Keadaan Mendesak ,Yakin Ingin Menghubungi ${name} ?`}
                      onSucsess={() => whatsappLink(el?.telphone)}
                    />
                  </div>

                  <div className="pt-3">
                    <AccordionLocationsInDrawer locations={destHandle}  noDesc={mobileCheck}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
