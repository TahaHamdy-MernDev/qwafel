import useCountry from "@/hooks/use-country";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "./reusable/Image";
const ChangeCountry: React.FC = () => {
  const currentCountry = useCountry();
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const changeCountry = (newCountry: string) => {
    if (newCountry === currentCountry) return;
    const newPath = pathname.replace(`/${currentCountry}`, `/${newCountry}`);
    Cookies.set("country", newCountry);
    router.replace(newPath);
  };
  const country = [
    { code: "ae", src: "/images/ae.svg" },
    { code: "sa", src: "/images/sa.svg" },
    { code: "eg", src: "/images/sa.svg" },
  ];
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-gray-200 rounded-full p-2 active:outline-none focus-visible:!outline-none focus-visible:border-none active:border-none">
          {/* <link
            type="image/png"
            sizes="16x16"
            rel="icon"
            href=".../icons8-saudi arabia-color-16.png"
          /> */}
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
