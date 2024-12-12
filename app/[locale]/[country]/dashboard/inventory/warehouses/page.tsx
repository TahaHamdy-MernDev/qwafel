import { getTranslations } from "next-intl/server";
import { getColumns, IWarehouse } from "./columns";
import Header from "./header";
import { DataTable } from "@/components/data-table";
async function getData(): Promise<IWarehouse[]>{
return[
    {
      id: 1,
      name: "Warehouse 1",
      created_at: "11/10/2024",
      country:"عمان"
    },
    {
      id: 2,
      name: "Warehouse 2",
      created_at: "11/10/2024",
      country:"المملكة المغربية"
    
    },
  ];

}

export default async function Page() {
    const data = await getData();
    const t =await getTranslations("Pages.Inventory")
    const columns= getColumns(t)
  return (
    <section>
      <Header />
      <DataTable columns={columns} data={data} />
    </section>
  );
}
