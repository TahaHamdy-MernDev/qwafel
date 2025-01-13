"use client";

import React from "react";
import Typography from "@/components/reusable/typography";

import { useTranslations } from "next-intl";
import CreateCourier from "./actions/create-courier";

const Header: React.FC = () => {
  const t = useTranslations("Pages.Settings");

  return (
    <div className="bg-white shadow-lg rounded-lg px-4 py-2 flex items-center justify-between">
      <Typography as={"h1"} variant={"title"}>
        {t("couriers")}
      </Typography>
      <CreateCourier />
    </div>
  );
};

export default Header;
