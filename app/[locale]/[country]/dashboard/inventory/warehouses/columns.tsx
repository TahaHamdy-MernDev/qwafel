import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

export interface IWarehouse {
  id?: string | number;
  name: string;
  country: string;
  created_at?: string;
}

export const getColumns = (
  t: ReturnType<typeof useTranslations>
): ColumnDef<IWarehouse>[] => [
  {
    header: "#",
    accessorKey: "id",
  },

  {
    header: t("name"),
    accessorKey: "name",
  },
  {
    header: t("country"),
    accessorKey: "country",
  },
  {
    header: t("date"),
    accessorKey: "created_at",
  },
];
