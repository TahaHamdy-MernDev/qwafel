"use client";
import { DataTable } from "@/components/data-table";
import AllCategoriesSearch from "../../_components/search/all-categories";
import { useGetCategoriesQuery } from "@/redux/services/products/category-api";
import { useLocale, useTranslations } from "next-intl";
import { getColumns } from "./columns";

export default function Page() {
  const t = useTranslations("Pages.Categories");
  const lang = useLocale();
  const columns = getColumns(t, lang);
  const { data, isLoading } = useGetCategoriesQuery({ page: 1 });
  if (isLoading) return <p>Loading...</p>;
  const categories = data?.data || [];
  console.log(categories);
  return (
    <div>
      <AllCategoriesSearch />
      {/* <AllCategoriesTable /> */}
      <DataTable columns={columns} data={categories} />

    </div>
  );
}
