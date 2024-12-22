"use client";
import { DataTable } from "@/components/data-table";
import { getColumns } from "./columns";
import { useTranslations } from "next-intl";
import { useGetSuppliersQuery } from "@/redux/services/purchases/suppliers-api";
import useCountry from "@/hooks/use-country";
import Header from "./header";

export default function Page() {
  const country = useCountry();
  const { data, isLoading } = useGetSuppliersQuery({
    country: country ?? undefined,
    page: 1,
  });
  const t = useTranslations("Pages.Inventory");
  if (isLoading) return <p>Loading.....</p>;
  const suppliers = data?.data || [];
  const columns = getColumns(t);
  return (
    <section>
      <Header />
      <DataTable data={suppliers} columns={columns} />
    </section>
  );
}
