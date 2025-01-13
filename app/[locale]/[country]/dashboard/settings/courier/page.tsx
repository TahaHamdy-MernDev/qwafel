"use client";
import { useGetCouriersQuery } from "@/redux/services/settings/courier-api";
import { getColumns } from "./columns";
import Header from "./header";
import { DataTable } from "@/components/data-table";
import { useTranslations } from "next-intl";
import useCountry from "@/hooks/use-country";

export default function Page() {
  const country = useCountry();
  const { data, isLoading } = useGetCouriersQuery({
    page: 1,
    country: country ?? undefined,
  });

  console.log(data, isLoading);
  
  const t = useTranslations("Pages.Settings");  
  if (isLoading) return <div>loading...</div>;
  const couriers = data?.data || [];
  const columns = getColumns(t);
  console.log(data);
  return (
    <section>
      <Header />
      <DataTable columns={columns} data={couriers} />
    </section>
  );
}
