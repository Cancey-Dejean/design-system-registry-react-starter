"use client";

import { IconCalendar } from "@tabler/icons-react";
import { format } from "date-fns";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Calendar } from "../calendar/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";

export type DatePickerProps = {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  captionLayout?: React.ComponentProps<typeof Calendar>["captionLayout"];
  disabled?: React.ComponentProps<typeof Calendar>["disabled"];
  fromYear?: number;
  toYear?: number;
  id?: string;
  align?: React.ComponentProps<typeof PopoverContent>["align"];
};

function DatePicker({
  value,
  defaultValue,
  onChange,
  placeholder = "Pick a date",
  className,
  buttonClassName,
  captionLayout = "label",
  disabled,
  fromYear,
  toYear,
  id,
  align = "start",
}: DatePickerProps) {
  const [uncontrolledDate, setUncontrolledDate] = React.useState<Date | undefined>(defaultValue);
  const date = value !== undefined ? value : uncontrolledDate;

  function setDate(next: Date | undefined) {
    if (value === undefined) {
      setUncontrolledDate(next);
    }
    onChange?.(next);
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              id={id}
              variant="outline"
              data-empty={!date}
              className={cn(
                "justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
                buttonClassName,
              )}
            />
          }
        >
          <IconCalendar data-icon="inline-start" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            captionLayout={captionLayout}
            disabled={disabled}
            startMonth={fromYear ? new Date(fromYear, 0) : undefined}
            endMonth={toYear ? new Date(toYear, 11) : undefined}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export type DatePickerWithRangeProps = {
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  numberOfMonths?: number;
  id?: string;
  align?: React.ComponentProps<typeof PopoverContent>["align"];
};

function DatePickerWithRange({
  value,
  defaultValue,
  onChange,
  placeholder = "Pick a date range",
  className,
  buttonClassName,
  numberOfMonths = 2,
  id,
  align = "start",
}: DatePickerWithRangeProps) {
  const [uncontrolledRange, setUncontrolledRange] = React.useState<DateRange | undefined>(
    defaultValue,
  );
  const range = value !== undefined ? value : uncontrolledRange;

  function setRange(next: DateRange | undefined) {
    if (value === undefined) {
      setUncontrolledRange(next);
    }
    onChange?.(next);
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              id={id}
              variant="outline"
              data-empty={!range?.from}
              className={cn(
                "min-w-[16.5rem] justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
                buttonClassName,
              )}
            />
          }
        >
          <IconCalendar data-icon="inline-start" />
          {range?.from ? (
            range.to ? (
              <>
                {format(range.from, "LLL dd, y")} - {format(range.to, "LLL dd, y")}
              </>
            ) : (
              format(range.from, "LLL dd, y")
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar
            mode="range"
            defaultMonth={range?.from}
            selected={range}
            onSelect={setRange}
            numberOfMonths={numberOfMonths}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { DatePicker, DatePickerWithRange };
