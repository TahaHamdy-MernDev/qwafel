"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { routing, usePathname, useRouter } from "@/i18n/routing";
import Cookies from "js-cookie";
interface ChangeLocalizationProps {
  className?: string;
}

const ChangeLocalization: React.FC<ChangeLocalizationProps> = ({
  className = "absolute top-4 ltr:left-4 rtl:right-4",
}) => {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const changeLocale = (newLocale: string) => {
    if (newLocale === currentLocale) return;
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    Cookies.set("lang", newLocale);
    router.replace(newPath, { locale: newLocale });
  };

  return (
    <div className={cn(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-gray-200 rounded-full p-2 active:outline-none focus-visible:!outline-none focus-visible:border-none active:border-none">
          <span className="flex items-center justify-center gap-1">
            <Globe />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {routing.locales.map((locale) => (
            <DropdownMenuCheckboxItem
              key={locale}
              onClick={() => changeLocale(locale)}
              checked={currentLocale === locale}
              className={cn(
                "font-semibold text-sm",
                locale === currentLocale && "bg-"
              )}
              // onCheckedChange={setShowStatusBar}
            >
              {locale === "ar" ? "العربية" : "English"}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChangeLocalization;
