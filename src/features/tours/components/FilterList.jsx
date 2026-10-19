import HoverCardUse from "@/components/HoverCardUse";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
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
import { Slider } from "@/components/ui/slider";
import { formatCurrencyId } from "@/utils/convertCurrency";
import { HandleQuery } from "@/utils/HandleUrlQuery";
import { LucideFilter, LucideRefreshCw } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DEFAULT_RANGE } from "./Params";
import CheckBoxTours from "./CheckBoxTours";
import CheckboxDateTour from "@/admin/DateTourAdmin/components/CheckboxDateTour";

export default function FilterList({
  categories = [],
  route,
  noPaddingTop,
  params,
}) {
  const navigate = useNavigate();
  const { getDest = [], getHotel = [], NumberRangeValue, name } = params || {};

  const concatVal = [...getDest, ...getHotel]?.map((x) => {
    return categories.find((s) => s.categoriesTour === x);
  });

  const [searchQuery, setSearchQuery] = useState(name);
  const [checked, setChecked] = useState(concatVal);
  const [open, setOpen] = useState(false);
  const [rangeNumber, setRangeNumber] = useState(NumberRangeValue);

  const validCategories = (val, type) =>
    val.filter((x) => x?.typeCategories === type);

  const categoriDest = validCategories(categories, "destination");
  const categoriHotel = validCategories(categories, "hotel");
  const checkFilter = Object.values(params).filter((x) => x).length > 1;

  function handleChecked(val) {
    const check = checked.some((x) => x._id === val._id);
    if (check) setChecked((x) => x.filter((s) => s._id !== val._id));
    else setChecked((x) => [...x, val]);
  }

  function handleApply() {
    const filter = {};

    const checkedDest = validCategories(checked, "destination");
    const checkedHotel = validCategories(checked, "hotel");
    const getValOneCheked = (val) =>
      checked.find((s) => s.check === val)?.value;

    const getVal = (val, type) => val?.map((x) => x[type]);

    if (checkedDest.length > 0)
      filter.dest = getVal(checkedDest, "categoriesTour");
    if (checkedHotel.length > 0)
      filter.hotel = getVal(checkedHotel, "categoriesTour");

    if (getValOneCheked("booking")) filter.booking = getValOneCheked("booking");

    const checkRange = rangeNumber.every((x, i) => x === DEFAULT_RANGE[i]);

    if (!searchQuery && checked.length === 0 && checkRange)
      return toast.info("Anda Belum Memilih Kategori", {
        description: "Silahkan Pilih Kategori Sesuai Kebutuhan Anda",
      });
    setOpen(false);

    navigate(
      `/${route}?${HandleQuery({ name: searchQuery, ...filter, rangeNumber })}`,
    );
  }

  function handleResetFilter() {
    navigate(`/${route}`);
  }

  const listFilter = {
    booking: [
      { text: "Booking Terbanyak", value: "booking-1", check: "booking" },
      { text: "Booking Terdikit", value: "booking+1", check: "booking" },
    ],
  };

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

      <SheetContent
        className={`${!noPaddingTop && "md:pt-20"} overflow-x-auto`}
      >
        <SheetHeader>
          <SheetTitle>Cari Tour Dan Filter</SheetTitle>
          <SheetDescription>
            Anda Bisa Mencari Tour Spesifik Sesuai Dengan Kebutuhan Anda
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="search">Cari Nama Tour</Label>

            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search"
              placeholder="Raja Ampat..."
            />
          </div>

          <CheckBoxTours
            categories={categoriDest}
            checked={checked}
            title={"Pilih Kategori Wisata"}
            handleChecked={handleChecked}
          />

          <CheckBoxTours
            categories={categoriHotel}
            checked={checked}
            title={"Pilih Kategori Hotel"}
            handleChecked={handleChecked}
          />
          <div className="mt-5 ">
            <CheckboxDateTour
              setChecked={setChecked}
              checked={checked}
              value={listFilter.booking}
              label={"Booking"}
            />
          </div>

          <div>
            <Label htmlFor="search" className={"mb-4 mt-5  grid md:flex "}>
              <span>Pilih Rentang Harga</span>
              <span>
                {`${formatCurrencyId(rangeNumber[0])} - ${formatCurrencyId(rangeNumber[1])} `}
              </span>
            </Label>
            <Slider
              onValueChange={(value) => setRangeNumber(value)}
              step={100000}
              min={0}
              max={6000000}
              value={rangeNumber}
              className="mx-auto w-full max-w-xs"
            />
          </div>

          <div className="md:mt-10 pb-15 md:pb-0 md:pt-0 pt-5">
            <Button onClick={handleApply} className="w-full">
              Terapkan Filter
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
