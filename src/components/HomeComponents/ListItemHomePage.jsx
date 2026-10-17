import { InboxIcon } from "lucide-react";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { BsClock, BsMailbox, BsShieldCheck, BsWhatsapp } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import ArrowUpRight from "../ArrowUpRight";
import HoverCardUse from "../HoverCardUse";

// Kolom kanan — Informasi Penting (info cards)
export const importantInfoData = [
  {
    renderText: "Klik Untuk Menghubungi Nomor WhtasApp",
    icon: BsWhatsapp, // sesuaikan dengan icon library kamu (lucide-react misal)
    title: "Nomor WhatsApp",
    description: "0859-5857-272",
    href: "https://wa.me/6285958572272",
  },
  {
    renderText: "Klik Untuk Menghubungi Email",
    icon: FiMail,
    title: "Email Support",
    description: "support@natours.com",
    href: "mailto:support@natours.com",
  },
  {
    id: "info-3",
    icon: BsClock,
    title: "Jam Operasional",
    description: "Setiap hari, 08.00 – 20.00 WIB",
  },
  {
    id: "info-4",
    icon: BsShieldCheck,
    title: "Kebijakan Pembatalan",
    description: "Refund penuh jika dibatalkan H-3 sebelum keberangkatan",
  },
];

export function ListItemHomePage() {
  return (
    <div className="py-20 border-b border-gray-100">
      <div className="mb-10">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-2">
          Informasi Penting
        </h2>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 leading-snug">
          Hubungi Kami
        </p>
      </div>
      <div className=" pt-3 ">
        <div className="flex w-full max-w-md flex-col gap-4">
          {importantInfoData?.map((el, idx) => (
            <a href={el.href} key={idx} className="group">
              <Item>
                <ItemMedia variant="icon">
                  <el.icon />
                </ItemMedia>
                <ItemContent>
                  {el.renderText && (
                    <HoverCardUse
                      Render={
                        <ItemTitle className="gap-4">
                          {el.title}
                          {el.href && <ArrowUpRight />}
                        </ItemTitle>
                      }
                      RenderText={el.renderText}
                    />
                  )}

                  <ItemTitle className="group">{!el.renderText && el.title}</ItemTitle>
                  <ItemDescription>{el.description}</ItemDescription>
                </ItemContent>
              </Item>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
