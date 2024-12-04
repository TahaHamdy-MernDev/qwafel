import * as React from "react";
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
  control: Control;
}

export function DatePickerWithRange({
  className,
  label,
  name,
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

  // Define predefined ranges
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
    formattedDate = <span></span>;
  }
  const [isOpen, setIsOpen] = React.useState(false); // State to manage visibility

  const handleConfirm = () => {
    // Perform confirmation logic
    setIsOpen(false); // Close the popover
  };
  return (
    <div className={cn("grid gap-2", className)} {...rest}>
      <label className="block text-gray-700 text-sm rtl:pr-1 ltr:pl-1 font-semibold">
        {label}
      </label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-center font-normal !px-1 border-2 border-input hover:bg-white hover:text-black border-gray-400 focus:border-gray-600 focus-visible:outline-none focus-visible:border-gray-600",
              !value && "text-muted-foreground"
            )}
          >
            {formattedDate}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            predefinedRanges={predefinedRanges.map((range, index) => (
              <button
                key={index + 1}
                className="w-full text-left p-2 hover:bg-primary rounded-md hover:text-primary-foreground"
                onClick={() => onChange(range.range)}
              >
                {range.label}
              </button>
            ))}
            footer={
              // <PopoverTrigger  asChild>
                <button onClick={handleConfirm}>Confirm</button>
              //  </PopoverTrigger>
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
