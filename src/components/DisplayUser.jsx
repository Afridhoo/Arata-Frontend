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
import AvatarSimpleUse from "./AvatarSimpleUse";
import { BadgeSimpleUse } from "./BadgeSimpleUse";
import { BsWhatsapp } from "react-icons/bs";
import { LucideMail } from "lucide-react";
import { DialogSimpleUse } from "./DialogSimpleUse";
import { whatsappLink } from "@/Api/ApiWhatsApp";

export default function DisplayUser({ UserBooking, icon, nameTour }) {
  return (
    <div>
      <Drawer swipeDirection="right">
        <DrawerTrigger
          render={<Button variant="default"> User Booking {icon}</Button>}
        />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>User Booking Pada Tour {nameTour}</DrawerTitle>
            <DrawerDescription>
              Detail User Ikut Serta Perjalanan Tour
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 p-4">
            <div className="size-full rounded-2xl bg-muted">
              {UserBooking?.map((el, idx) => (
                <div className="py-6   pl-2 pt-5  gap-5  border-b  border-gray-300 relative">
                  <div className="absolute top-2 w-full  ">
                    <div className="flex  items-center  gap-5">
                      <BadgeSimpleUse
                        desc={idx + 1}
                        style={
                          "bg-gray-300 text-gray-700 font-semibold rounded-bl-lg ml-1 "
                        }
                      />
                      <DialogSimpleUse
                        btnText={"Hubungi User"}
                        style={
                          "w-fit rounded-full bg-red-400 h-fit text-xs py-1"
                        }
                        title={"Menghubungi Darurat"}
                        desc={`Pastikan Memang Ada Keadaan Mendesak ,Yakin Ingin Menghubungi ${el?.name} ?`}
                        onSucsess={() => whatsappLink(el?.telphone)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-8">
                    <div className="max-w-20 ">
                      <AvatarSimpleUse
                        photo={el.photo}
                        isActive={true}
                        noBage={true}
                      />
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="font-semibold text-gray-700">
                        {el?.name}
                      </span>
                      <BadgeSimpleUse
                        desc={el?.telphone}
                        variant={"default"}
                        icon={<BsWhatsapp />}
                      />
                      <BadgeSimpleUse
                        desc={el?.email}
                        variant={"outline"}
                        icon={<LucideMail />}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DrawerFooter>
            <span className="text-center font-semibold text-gray-500 text-xs">
              Jika Terdapat Kendala Silahkan Hubungi User
            </span>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
