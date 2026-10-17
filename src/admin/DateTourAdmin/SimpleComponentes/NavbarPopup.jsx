import { BadgeSimpleUse } from "@/components/BadgeSimpleUse";
import { LucideInfo, LucideMapPinCheckInside, LucideX } from "lucide-react";

export default function NavbarPopup({value , onCancel}) {
  return (
   <div className="border-b  px-6 py-4">
             <div className="flex items-center justify-between">
               <div className="grid gap-2">
                 <h3 className="text-lg font-semibold">
                   Atur Jadwal & Pemandu Wisata
                 </h3>
   
                 <BadgeSimpleUse
                   desc={"Pastikan Tanggal Yang Dipilih / Update Sesuai"}
                   icon={<LucideInfo />}
                   variant={"default"}
                 />
               </div>
   
               <div className="flex gap-10">
                 <div className="grid gap-2 ">
                   <BadgeSimpleUse
                     desc={`Nama Tour :  ${value?.name}`}
                     icon={<LucideMapPinCheckInside />}
                     variant={"outline"}
                   />
                   <BadgeSimpleUse
                     desc={`Durasi Tour  : ${value?.duration} Hari`}
                     icon={<LucideMapPinCheckInside />}
                     variant={"default"}
                   />
                 </div>
                 <button
                   onClick={onCancel}
                   type="button"
                   className=" cursor-pointer"
                 >
                   <LucideX className="h-5 w-5" />
                 </button>
               </div>
             </div>
           </div>
  )
}
