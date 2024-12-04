"use client";
import * as React from "react";
import { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";
import { getLangDir } from "rtl-detect";
import { useLocale } from "next-intl";
import { Accordion, AccordionContent, AccordionItem } from "./accordion";
interface InputProps extends React.ComponentProps<"input"> {
  mainIcon?: React.ReactNode;
  secondIcon?: React.ReactNode;
  hasError?: FieldError | boolean;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  clearFieldError?: () => void;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      placeholder,
      mainIcon,
      secondIcon,
      hasError,
      errorMessage,
      label,
      clearFieldError,
      ...props
    },
    ref
  ) => {
    const locale = useLocale();
    const dir = getLangDir(locale);
    const rtlPadding =
      mainIcon != undefined ? (dir === "rtl" ? "pr-10" : "pl-10 ") : "";
    const ltrPadding =
      secondIcon != undefined ? (dir === "ltr" ? "pl-10 " : "") : "";
    const mainIconPosition = dir === "rtl" ? "right-0 pr-3" : "left-0 pl-3";
    const secondIconPosition = dir === "ltr" ? "right-0 pr-3" : "left-0 pl-3";
    const [isAccordionOpen, setIsAccordionOpen] = React.useState<boolean>(
      Boolean(errorMessage)
    );

    React.useEffect(() => {
      if (errorMessage) {
        setIsAccordionOpen(true);

        const timer = setTimeout(() => {
          if (clearFieldError) {
            clearFieldError();
          }
          setIsAccordionOpen(false);
        }, 3000);

        return () => clearTimeout(timer);
      }
    }, [errorMessage, clearFieldError]);
    return (
      <div className="grid w-full max-w-lg items-center gap-2">
        {label && (
          <label className="block text-gray-dark md:text-sm lg:text-base font-semibold ltr:pl-1 rtl:pr-1">
            {label}
          </label>
        )}
        <div className=" relative">
          <input
            type={type}
            placeholder={placeholder}
            className={cn(
              "flex h-12 w-full rounded-md border border-primary  focus-visible:outline-none bg-transparent px-3 py-1 text-base  transition-colors duration-200  file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground  placeholder:text-base disabled:cursor-not-allowed disabled:opacity-50 md:text-sm lg:text-base",
              rtlPadding,
              ltrPadding,
              hasError
                ? "border-red-600"
                : " focus:border-input-focus  focus-visible:border-primary",
              className
            )}
            ref={ref}
            {...props}
          />
          {mainIcon && (
            <div
              className={cn(
                "absolute inset-y-0 flex items-center",
                mainIconPosition
              )}
            >
              {mainIcon}
            </div>
          )}

          {secondIcon && (
            <div
              className={cn(
                "absolute inset-y-0 flex items-center",
                secondIconPosition
              )}
            >
              {secondIcon}
            </div>
          )}
        </div>
        <Accordion
          type="single"
          collapsible
          value={isAccordionOpen ? label : ""}
          onValueChange={(value) => setIsAccordionOpen(Boolean(value))}
        >
          <AccordionItem value={label as string} className="border-none">
            <AccordionContent>{errorMessage}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
