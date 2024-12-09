import * as React from "react";
import { useController, Control } from "react-hook-form";
import {
  Select as SelectComponent,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";

interface SelectOption {
  value: string| number;
  label: string;
}

interface SelectComponentProps {
  placeholder?: string;
  label?: string;
  options: SelectOption[];
  name: string;
  control?: Control;
}

export function Select({
  label,
  options,
  name,
  control,
  placeholder,
  
}: Readonly<SelectComponentProps>) {
  const t = useTranslations("global");
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  const {
    field: { onChange, value, ref },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <div className="grid w-full max-w-lg items-center gap-2">
      {label && (
        <label className="block text-gray-dark md:text-sm lg:text-base font-semibold ltr:pl-1 rtl:pr-1">
          {label}
        </label>
      )}
      <div className=" relative">

      <SelectComponent
        value={value} 
        onValueChange={(newValue) => {
          onChange(newValue);
        }}
      >
        <SelectTrigger className="w-full overflow-auto" ref={ref}>
          <SelectValue placeholder={placeholder ?? t("choose")} />
        </SelectTrigger>
        <SelectContent dir={dir}>
          <SelectGroup>
            {label && <SelectLabel>{label}</SelectLabel>}
            {options?.map((item, idx) => (
              <SelectItem key={`${item.value}-${idx}`} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectComponent>
            </div>
    </div>
  );
}
