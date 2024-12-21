"use client";
import { DataTable } from "@/components/data-table";
import AllSearch from "../_components/search/all-search";
import { useGetProductsQuery } from "@/redux/services/products/products-api";
import { useLocale, useTranslations } from "next-intl";
import { getColumns, IProduct } from "./column";
import { ColumnDef } from "@tanstack/react-table";
import useCountry from "@/hooks/use-country";

export default function Page() {
  const country = useCountry();
  const t = useTranslations("Products");
  const lang = useLocale();
  const { data, isLoading } = useGetProductsQuery({
    page: 1,
    country,
  });
  const columns: ColumnDef<IProduct, unknown>[] = getColumns(t, lang);
  const products = data?.data ?? [];
  console.log(products);
  return (
    <>
      <AllSearch />
      <DataTable data={products} columns={columns} />
    </>
  );
}
