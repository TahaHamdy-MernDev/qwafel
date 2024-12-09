import useCountry from "@/hooks/use-country";
import { routing, usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import { Globe } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "./reusable/Image";
import { Button } from "./ui/button";

const ChangeCountry: React.FC = () => {
  const currentCountry = useCountry();
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const changeCountry = (newCountry: string) => {
    if (newCountry === currentCountry) return;
    const newPath = pathname.replace(`/${currentCountry}`, `/${newCountry}`);

    router.replace(newPath);
  };
  const country = [
    { code: "ae", src: "/images/ae.svg" },
    { code: "sa", src: "/images/sa.svg" },
  ];
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="py-3 active:outline-none focus-visible:!outline-none focus-visible:border-none active:border-none">
          <link
            type="image/png"
            sizes="16x16"
            rel="icon"
            href=".../icons8-saudi arabia-color-16.png"
          />
          <Image
            width={24}
            height={24}
            alt="country"
            className="object-cover rounded-full w-6 h-6"
            src={currentCountry === "sa" ? country[1].src : country[0].src}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {country.map((country) => (
            <DropdownMenuCheckboxItem
              key={country.code}
              onClick={() => changeCountry(country.code)}
              checked={currentCountry === country.code}
              className={cn(
                "font-semibold text-sm ",
                country.code === currentCountry && "bg-"
              )}
            >
              {country.code === "sa" ? "السعوديه" : "الامارات"}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChangeCountry;
