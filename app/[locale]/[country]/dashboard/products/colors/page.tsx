"use client";
import { useGetColorsQuery } from "@/redux/services/products/colors-api";
import { getColumns } from "./columns";
import Header from "./header";
import { DataTable } from "@/components/data-table";
import { useTranslations } from "next-intl";


export default function Page() {
  const t = useTranslations("Pages.Colors");
  const { data, isLoading } = useGetColorsQuery();
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Error fetching data</p>;
  const colors = data?.data;
  const columns = getColumns(t);
  return (
    <section className=" container">
      <Header />
      <DataTable columns={columns} data={colors} />
    </section>
  );
}
