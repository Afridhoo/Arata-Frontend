import { Link } from "react-router-dom";
import {
  ShieldOff,
  ArrowLeft,
  Clock,
  ArrowUpRight,
  LucideUserShield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BsWhatsapp } from "react-icons/bs";
import { whatsappLink } from "@/Api/ApiWhatsApp";

export default function NotActiveAccount() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center shadow-sm">
              <ShieldOff className="size-9 text-muted-foreground" />
            </div>
            {/* Status dot */}
            <span className="absolute -top-1 -right-1 flex size-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-60" />
              <span className="relative inline-flex size-4 rounded-full bg-destructive" />
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <Badge variant="destructive" className="mb-1">
            Akun Dinonaktifkan
          </Badge>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Akun Pandumu Dinonaktifkan
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Akun pemandu wisatamu telah dinonaktifkan oleh admin. Hubungi admin
            untuk informasi lebih lanjut atau pengaktifan kembali.
          </p>
        </div>

        <Separator />

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="rounded-lg border bg-card p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-4" />
              <span className="text-xs font-medium">Status</span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              Akun Dinonaktifkan
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BsWhatsapp className="size-4" />
              <span className="text-xs font-medium">Info Lanjut</span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              Hubungi Admin
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          <Button
            onClick={() =>
              whatsappLink(import.meta.env.VITE_WHATSAPP_NUMBER_ADMIN)
            }
            className="w-full cursor-pointer gap-2"
          >
            <LucideUserShield className="size-4" />
            Hubungi Admin
            <ArrowUpRight className="size-4" />
          </Button>

          <Link to="/AccountMe">
            <Button variant="outline" className="w-full cursor-pointer gap-2">
              <ArrowLeft className="size-4" />
              Kembali Ke Profil
            </Button>
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-xs text-muted-foreground">
          Jika sudah lama menunggu, silahkan <span>hubungi admin</span> untuk
          bantuan lebih lanjut.
        </p>
      </div>
    </div>
  );
}
