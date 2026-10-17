import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LucideRefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CheckboxDateTour from "./CheckboxDateTour";
import { useState } from "react";
import { toast } from "sonner";
import { HandleQuery } from "@/utils/HandleUrlQuery";
import { booking, date, guideAssigned, guideReady } from "./ListFilter";

export default function FilterDateTour({ params }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState([]);
  const [searchName, setSearchName] = useState(params?.name || "");

  function handleResetFilter() {
    navigate("/admin/setDateGuidesTour");
  }

  function handleApplyFilter() {
    if (checked.length <= 0 && searchName === "")
      return toast.info("Anda Belum Memilih Filter", {
        description: "Silahkan Pilih Filter Berdasarkan Kebutuhan Anda",
      });

    const filter = {};
    const getVal = (val) => checked.find((s) => s.check === val)?.value;

    function handleGetVal(val) {
      const value = getVal(val);
      if (value) filter[val] = value;
    }

    handleGetVal("guideReady");
    handleGetVal("date");
    handleGetVal("booking");
    handleGetVal("guideAssigned");

    setOpen(false);

    navigate(
      `/admin/setDateGuidesTour?${HandleQuery({ name: searchName, ...filter })}`,
    );
  }

  const checkFilter = Object.values(params).filter((x) => x).length > 0;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button variant="outline" className={"mr-2 cursor-pointer"}>
          Filters
        </Button>
      </SheetTrigger>
      {checkFilter && (
        <Button
          variant="default"
          onClick={handleResetFilter}
          className={"cursor-pointer"}
        >
          <LucideRefreshCw size={12} /> Reset Filter
        </Button>
      )}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cari Nama Tour & Filter</SheetTitle>
          <SheetDescription>
            Anda Bisa Mencari Nama Lokasi Tour Atau Filter Secara Spesifik
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="search">Cari Tour</Label>

            <Input
              id="search"
              placeholder="Bali..."
              value={searchName}
              defaultValue={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          <CheckboxDateTour
            label={"Booking"}
            value={booking}
            setChecked={setChecked}
            defaultChecked={params?.booking}
            checked={checked}
          />

          <CheckboxDateTour
            label={"Tanggal"}
            defaultChecked={params?.date}
            value={date}
            setChecked={setChecked}
            checked={checked}
          />

          <CheckboxDateTour
            label={"Pemandu"}
            defaultChecked={params?.guideReady}
            value={guideReady}
            checked={checked}
            setChecked={setChecked}
          />

          <CheckboxDateTour
            label={"Pemandu"}
            setChecked={setChecked}
            defaultChecked={params?.guideAssigned}
            value={guideAssigned}
            checked={checked}
          />

          <Button onClick={handleApplyFilter} className="w-full">
            Terapkan Filter
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
