"use client";
import { DataTable } from "@/components/data-table";
import Header from "./header";
import { getColumns } from "./column";
import { useTranslations } from "next-intl";
import { useGetSizesQuery } from "@/redux/services/products/sizes-api";

export default function Page() {
  const t = useTranslations("Pages.Sizes");
  const { data, isLoading } = useGetSizesQuery({ page: 1 });
  if (isLoading) return <p>Loading...</p>;
  const sizes = data?.data;
  const columns = getColumns(t);
  return (
    <section className="container">
      <Header />
      <DataTable data={sizes || []} columns={columns} />
    </section>
  );
}
