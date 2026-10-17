import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function DialogSimpleUse({
  btnText,
  title,
  desc,
  onSucsess,
  checkValIsFalse,
  messageFalse,
  textSubmit,
  style,
  variant,
}) {
  function handleSucsess() {
    if (checkValIsFalse) {
      const cheking = checkValIsFalse?.every((el) => el);
      if (!cheking) return toast.error(messageFalse);
    }

    onSucsess();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant={variant || "default"}
            className={`${style} cursor-pointer`}
          >
            {btnText}
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={"cursor-pointer"}>
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            className={"cursor-pointer"}
            onClick={handleSucsess}
          >
            {textSubmit || "Yakin"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
