import { DataTable } from "@/components/data-table";
import AllCategoriesSearch from "../../_components/search/all-categories";
import { columns, ICategory } from "./columns";
async function getData(): Promise<ICategory[]> {
  return [
    {
      id: 1,
      name: "Category 1",
      is_active: false,
      created_at: "11/10/2024",
      image: "https://placehold.co/60x60",
    },
    {
      id: 2,
      name: "Category 2",
      is_active: true,
      image: "https://placehold.co/60x60",
      created_at: "11/10/2024",
    },
    {
      id: 3,
      name: "Category 3",
      is_active: false,
      image: "https://placehold.co/60x60",
      created_at: "11/10/2024",
    },
    //... more categories here
  ];
}
export default async function Page() {
  const data = await getData();
  return (
    <div>
      <AllCategoriesSearch />
      {/* <AllCategoriesTable /> */}
      <DataTable columns={columns} data={data} />
    </div>
  );
}
