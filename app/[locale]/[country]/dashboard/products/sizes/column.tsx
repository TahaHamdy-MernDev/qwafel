import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

export interface ISize {
  id: number;
  name: string;
}

export const getColumns = (
  t: ReturnType<typeof useTranslations>
): ColumnDef<ISize>[] => [
  {
    header: t("name"),
    accessorKey: "name",
  },
];
