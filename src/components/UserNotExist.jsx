import { ArrowUpRightIcon, LucideUserX2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link } from "react-router-dom";
import { BadgeSimpleUse } from "./BadgeSimpleUse";

export function UserNotExist() {
  return (
    <Empty className={"mt-20 flex items-center justify-center"}>
      <EmptyHeader>
        <EmptyMedia variant="icon">{<LucideUserX2 />}</EmptyMedia>
        <EmptyTitle>{"Akun Tidak Di Temukan"}</EmptyTitle>
        <EmptyDescription>
          {"Silahkan Login Dahulu , Jika Belum Ada Akun Silahkan Daftar"}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Link to={"/login"}>
          <Button className={"cursor-pointer"}>{"Login Akun"}</Button>
        </Link>

        <Link to={"/signup"}>
          <Button className={"cursor-pointer"} variant="outline">
            {"Daftar Akun"}
          </Button>
        </Link>
      </EmptyContent>
      <Link to={"/services"} className="text-muted-foreground text-sm mt-5">
        <BadgeSimpleUse
          desc={"Hubungi Admin"}
          variant={"outline"}
          icon={<ArrowUpRightIcon />}
        />
      </Link>
    </Empty>
  );
}
