import { Button } from "@/components/ui/button";
import { LucideCheck } from "lucide-react";

export default function SubmitBtn({onCancel}) {
  return (
       <div className=" absolute   right-1 bottom-1  ">
              <div className="flex items-center justify-end gap-3    px-6 py-4">
                <Button
                  onClick={onCancel}
                  type="button"
                  className="cursor-pointer"
                  size="lg"
                  variant="outline"
                >
                  Batalkan
                </Button>
                <Button
                  type="submit"
                  className=" text-sm font-semibold cursor-pointer "
                  size="lg"
                >
                  <LucideCheck className="w-4 h-4" />
                  Simpan Jadwal
                </Button>
              </div>
            </div>
  )
}
