"use client";

import React from "react";
import { getColumns } from "./column";
import { DataTable } from "@/components/data-table";
import { useLocale, useTranslations } from "next-intl";
import Typography from "@/components/reusable/typography";
import { useGetVariantStockQuery } from "@/redux/services/inventory/variant-stock-api";
import useCountry from "@/hooks/use-country";

export default function Page() {
  const country = useCountry();
  const { data, isLoading } = useGetVariantStockQuery({
    page: 1,
    country,
  });
  const lang = useLocale();
  const t = useTranslations("Pages.Variants");
  const columns = getColumns(t, lang);
  if (isLoading) return <p>Loading...</p>;
  const variantStock = data?.data || [];
  return (
    <section>
      <div className="flex items-center justify-between">
        <Typography as={"h1"} variant={"title"}>
          {t("title")}
        </Typography>
        {/* <CreateStockLog /> */}
      </div>
      <DataTable data={variantStock} columns={columns} />
    </section>
  );
}
