import { Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function DialogDelete({
  text,
  title,
  desc,
  onSubmit,
  defaultVariant,
  defaultCss,
  icon,
  textSubmit,
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            className={`cursor-pointer ${!defaultCss && " h-6 rounded-full text-xs"}`}
            variant={defaultVariant || "destructive"}
          >
            {icon}
            {text}
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={"cursor-pointer"} variant="outline">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onSubmit}
            className={"cursor-pointer"}
            variant="destructive"
          >
            {textSubmit || "Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
