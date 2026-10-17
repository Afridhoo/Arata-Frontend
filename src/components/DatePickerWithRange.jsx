"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({ numMonths = 1, setDate, date, _id }) {
  const isValidDate = date?.find((e) => e._id === _id);


 

  return (
    <Field className="w-60">
      <FieldLabel htmlFor="date-picker-range">Pilih Tanggal</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              id="date-picker-range"
              className="justify-start px-2.5 font-normal cursor-pointer"
            >
              <CalendarIcon data-icon="inline-start" />
              {isValidDate?.date?.from ? (
                isValidDate?.date?.to ? (
                  <>
                    {format(isValidDate?.date?.from, "LLL dd, y")} -{" "}
                    {format(isValidDate?.date?.to, "LLL dd, y")}
                  </>
                ) : (
                  format(isValidDate?.date?.from, "LLL dd, y")
                )
              ) : (
                <span>Pilih Tanggal</span>
              )}
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={isValidDate?.date?.from}
            selected={isValidDate?.date}
            onSelect={(selectedDate) => setDate({ date: selectedDate, _id })}
            numberOfMonths={numMonths}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
