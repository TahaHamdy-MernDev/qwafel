import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

export interface IColor {
  id?: string | number;
  name: string;
}

export const getColumns = (
  t: ReturnType<typeof useTranslations>
): ColumnDef<IColor>[] => [
  {
    header: t("name"),
    accessorKey: "name",
  },
];
