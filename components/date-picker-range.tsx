import React, { useState } from "react";
import { useController, Control } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  subDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
} from "date-fns";

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  name: string;
  placeholder?: string;
  control: Control;
}

export function DatePickerWithRange({
  className,
  label,
  name,
  placeholder,
  control,
  ...rest
}: Readonly<DatePickerWithRangeProps>) {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: {
      from: undefined,
      to: undefined,
    },
  });

  const [focusedDate, setFocusedDate] = useState<Date | undefined>(undefined);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const predefinedRanges = [
    { label: "Today", range: { from: new Date(), to: new Date() } },
    {
      label: "Yesterday",
      range: { from: subDays(new Date(), 1), to: subDays(new Date(), 1) },
    },
    {
      label: "This Week",
      range: { from: startOfWeek(new Date()), to: endOfWeek(new Date()) },
    },
    {
      label: "Last Week",
      range: {
        from: subDays(startOfWeek(new Date()), 7),
        to: subDays(endOfWeek(new Date()), 7),
      },
    },
    {
      label: "This Month",
      range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) },
    },
    {
      label: "Last Month",
      range: {
        from: subDays(startOfMonth(new Date()), 30),
        to: subDays(endOfMonth(new Date()), 30),
      },
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handlePredefinedRangeClick = (range: { from: Date; to: Date }) => {
    onChange(range);
    setFocusedDate(range.from); // Set focus to start date
    setCurrentMonth(range.from); // Navigate to the correct month
  };
  const handleReset = () => {
    onChange({ from: undefined, to: undefined }); // Clear the date range
    setFocusedDate(undefined); // Clear the focused date
    setCurrentMonth(new Date()); // Reset the calendar to the current month
  };
  let formattedDate;
  if (value?.from) {
    if (value.to) {
      formattedDate = (
        <>
          {format(value.from, "dd-LL-y")} / {format(value.to, "dd-LL-y")}
        </>
      );
    } else {
      formattedDate = format(value.from, "dd-LL-y");
    }
  } else {
    formattedDate = <span className="text-start">{placeholder}</span>;
  }

  const handleConfirm = () => {
    setIsOpen(false);
  };

  return (
    <div className={cn("grid gap-2", className)} {...rest}>
      {label && (
        <label className="block text-gray-700 text-sm rtl:pr-1 ltr:pl-1 font-semibold">
          {label}
        </label>
      )}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start font-normal !px-3 border border-primary focus:border-gray-600 focus-visible:outline-none focus-visible:border-gray-600",
              !value && "text-muted-foreground"
            )}
          >
            {formattedDate}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            predefinedRanges={predefinedRanges.map((range, index) => (
              <button
                key={index + 1}
                className="w-full text-left p-2 hover:bg-primary rounded-md text-base hover:text-primary-foreground"
                onClick={() => handlePredefinedRangeClick(range.range)}
              >
                {range.label}
              </button>
            ))}
            footer={
              <div className="flex items-center justify-between gap-2 w-full">
                <div className=" flex items-center gap-2">
                  <Button onClick={handleConfirm} size={"sm"}>
                    Confirm
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    size={"sm"}
                    variant={"outline"}
                  >
                    Cancel
                  </Button>
                </div>
                <Button onClick={handleReset} size={"sm"} variant={"ghost"}>
                  Reset
                </Button>
              </div>
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
