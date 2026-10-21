import CheckboxDateTour from "@/admin/DateTourAdmin/components/CheckboxDateTour";
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
import { LucideFilter, LucideRefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { date, group, statusBooking, totals } from "./ListFilterBooking";
import { useState } from "react";
import { toast } from "sonner";
import { HandleQuery } from "@/utils/HandleUrlQuery";

export default function FilterBooking({ params }) {
  const navigate = useNavigate();

  const checkFilter = Object.values(params).filter((x) => x).length > 0;

  const [checked, setChecked] = useState([]);
  const [searchName, setSearchName] = useState(params.search || "");

  function handleResetFilter() {
    navigate("/admin/booking");
  }

  function handleApplyFilter() {
    if (checked.length === 0 && searchName === "")
      return toast.info("Anda Belum Menentukan Filter", {
        description: "Silahkan Pilih Filter Sesuai Dengan Kebutuhan Anda",
      });

    const filter = {};

    function handleGetFilter(name) {
      const checkChecked = checked.find((s) => s.check === name);

      if (checkChecked) filter[name] = checkChecked.value;
    }

    handleGetFilter("date");
    handleGetFilter("status");
    handleGetFilter("totals");
    handleGetFilter("group");

    navigate(`/admin/booking?${HandleQuery({ name: searchName, ...filter })}`);
  }

  return (
    <Sheet>
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
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          <CheckboxDateTour
            label={"Booking"}
            value={statusBooking}
            setChecked={setChecked}
            checked={checked}
          />
          <CheckboxDateTour
            label={"Tanggal Booking"}
            value={date}
            setChecked={setChecked}
            checked={checked}
          />

          <CheckboxDateTour
            label={"Total Biaya"}
            value={totals}
            setChecked={setChecked}
            checked={checked}
          />

          <CheckboxDateTour
            label={"Group"}
            value={group}
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
