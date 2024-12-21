"use client";
import { useGetWarehousesQuery } from "@/redux/services/inventory/warehouses-api";
import { getColumns } from "./columns";
import Header from "./header";
import { DataTable } from "@/components/data-table";
import { useTranslations } from "next-intl";
import useCountry from "@/hooks/use-country";

export default function Page() {
  const country= useCountry()
  const { data, isLoading } = useGetWarehousesQuery({ page: 1 , country});
  const t = useTranslations("Pages.Inventory");
  if (isLoading) return <div>loading...</div>;
  const warehouses = data?.data || [];
  const columns = getColumns(t);
  console.log(data)
  return (
    <section>
      <Header />
      <DataTable columns={columns} data={warehouses} />
    </section>
  );
}
