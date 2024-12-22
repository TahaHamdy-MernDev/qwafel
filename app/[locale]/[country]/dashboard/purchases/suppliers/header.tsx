"use client";

import React from "react";
import Typography from "@/components/reusable/typography";

import { useTranslations } from "next-intl";
import CreateSupplier from "./actions/create-supplier";

const Header: React.FC = () => {
  const t = useTranslations("Pages.Purchases");

  return (
    <div className="bg-white shadow-lg rounded-lg px-4 py-2 flex items-center justify-between">
      <Typography as={"h1"} variant={"title"}>
        {t("suppliers")}
      </Typography>
      <CreateSupplier />
    </div>
  );
};

export default Header;
