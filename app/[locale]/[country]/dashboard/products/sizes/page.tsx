import { DataTable } from "@/components/data-table";
import Header from "./header";
import { getColumns, ISize } from "./column";
import { getTranslations } from "next-intl/server";

async function getData(): Promise<ISize[]> {
  return [
    { id: 1, name: "S" },
    { id: 2, name: "M" },
    { id: 3, name: "L" },
    { id: 4, name: "XL" },
  ];
}

export default async function Page() {
  const data = await getData();
  const t = await getTranslations("Pages.Sizes");
  const columns = getColumns(t);
  return (
    <section className="container">
      <Header />
      <DataTable data={data} columns={columns} />
    </section>
  );
}
