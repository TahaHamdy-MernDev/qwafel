"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
interface ISearch {
  children: React.ReactNode;
  title?: string;
}
const Search: React.FC<ISearch> = ({ children, title }) => {
  const t = useTranslations("search");
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);
  return (
    <Accordion type="single" collapsible className="card flex items-center justify-between">
      <AccordionItem
        value="item-1"
        className="focus:outline-none focus-visible:outline-none border-none  shadow-none"
      >
        <div className="w-full flex justify-between items-center  gap-2 h-12">
          <h3 className=" text-2xl text-black font-semibold w-full">{title}</h3>
          <AccordionTrigger
            icon={false}
            headerClassName="h-10  p-0 focus:outline-none focus-visible:outline-none active:outline-none hover:no-underline border-none"
            className="h-10 border-none  rounded-lg   flex items-center justify-between focus:outline-none focus-visible:outline-none active:outline-none hover:no-underline   p-2 px-0"
          >
            <span
              className="h-10 px-8 flex items-center justify-center gap-2 text-base rounded-lg !bg-primary !text-white"
              onClick={() => setToggleSearch(!toggleSearch)}
            >
              {t("showSearch")}
            </span>
          </AccordionTrigger>
        </div>
        <AccordionContent className="  border-none  drop-shadow  mt-2 rounded-lg">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default Search;
