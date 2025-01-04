"use client";
import { DataTable } from "@/components/data-table";
import useCountry from "@/hooks/use-country";
import { useGetStockLogsQuery } from "@/redux/services/purchases/stock-logs-api";
import { useLocale, useTranslations } from "next-intl";
import { getStockLogsColumns } from "./columns";
import Typography from "@/components/reusable/typography";
import CreateStockLog from "./actions/create";

export default function Page() {
  const country = useCountry();
  const lang = useLocale();
  const t = useTranslations("Pages.Stock_logs");
  const columns = getStockLogsColumns(t, lang);
  const { data, isLoading } = useGetStockLogsQuery({
    country: country ?? undefined,
    page: 1,
  });
  if (isLoading) return <p>Loading...</p>;
  const logs = data?.data || [];
  return (
    <section>
      <div className="flex items-center justify-between">
        <Typography as={"h1"} variant={"title"}>
          {t("title")}
        </Typography>
        <CreateStockLog />
      </div>
      <DataTable data={logs} columns={columns} />
    </section>
  );
}
