"use client";

import React from "react";
import Typography from "@/components/reusable/typography";

import { useTranslations } from "next-intl";
import CreateWarehouse from "./actions/create-warehouse";

const Header: React.FC = () => {
  const t = useTranslations("Pages.Inventory");

  return (
    <div className="bg-white shadow-lg rounded-lg px-4 py-2 flex items-center justify-between">
      <Typography as={"h1"} variant={"title"}>
        {t("warehouses")}
      </Typography>
      <CreateWarehouse />
    </div>
  );
};

export default Header;
