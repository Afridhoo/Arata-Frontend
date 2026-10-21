import CheckboxDateTour from "@/admin/DateTourAdmin/components/CheckboxDateTour";
import { Button } from "@/components/ui/button";
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
import { LucideFilter, LucideRefreshCw } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { role } from "./ListFilterAddGuide";
import { toast } from "sonner";
import { HandleQuery } from "@/utils/HandleUrlQuery";

export default function FilterAddNewGuide({ params }) {
  const checkFilter = Object.values(params).filter((x) => x).length > 0;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState([]);
  const [searchValue, setSearchValue] = useState(params.searchValue || "");

  function handleResetFilter() {
    navigate("/admin/addNewGuide");
  }

  function handleApplyFilter() {
    if (checked.length === 0 && searchValue === "")
      return toast.info("Anda Belum Menentukan Filter", {
        description: "Silahkan Pilih Filter Sesuai Dengan Kebutuhan Anda",
      });

    const filter = {};

    function handleGetFilter(name) {
      const checkChecked = checked.find((s) => s.check === name);

      if (checkChecked) filter[name] = checkChecked.value;
    }

    setOpen(false);
    handleGetFilter("role");

    navigate(`/admin/addNewGuide?${HandleQuery({ searchValue, ...filter })}`);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {checkFilter && (
        <Button
          variant="default"
          onClick={handleResetFilter}
          className={"cursor-pointer"}
        >
          <LucideRefreshCw size={12} /> Reset Filter
        </Button>
      )}
      <SheetTrigger
        render={<Button variant="outline" className={"cursor-pointer"} />}
      >
        <LucideFilter size={12} /> Filter
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cari Nama User , Tour & Filter</SheetTitle>
          <SheetDescription>
            Anda Bisa Melakukan Pencarian Nama User , Tour Dan Filter Sesuai
            Kebutuhan Anda
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="search">Search</Label>

            <Input
              id="search"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <CheckboxDateTour
            label={"Berdasarkan Role"}
            value={role}
            setChecked={setChecked}
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
