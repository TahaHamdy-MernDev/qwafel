import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

export interface IColor {
  id?: string | number;
  name_en: string;
  name_ar: string;
}

export const getColumns = (
  t: ReturnType<typeof useTranslations>,
  lang: string
): ColumnDef<IColor>[] => [
  {
    header: t("name"),
    accessorKey: `name_${lang}`,
  },
];
