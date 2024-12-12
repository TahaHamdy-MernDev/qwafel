import { getTranslations } from "next-intl/server";
import { getColumns, IColor } from "./columns";
import Header from "./header";
import { DataTable } from "@/components/data-table";
async function getData(): Promise<IColor[]> {
  return [
    { id: 1, name: "Red" },
    { id: 2, name: "Green" },
    { id: 3, name: "Blue" },
    { id: 4, name: "Yellow" },
  ];
}

export default async function Page() {
  const data = await getData();
  const t = await getTranslations("Pages.Colors");
  const columns = getColumns(t);
  return (
    <section className=" container">
      <Header />
      <DataTable columns={columns} data={data} />
    </section>
  );
}
