import { formatDateTime } from "@/common/format-date";
import Image from "@/components/reusable/Image";
import { IVariantStock as IVariantStockOriginal } from "@/types/variants-types";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
interface IVariantStock extends IVariantStockOriginal {
  id: number;

  name: string;

  color: {
    [key: `name_${string}`]: string;
    name_ar: string;
    name_en: string;
    name: string;
  } | null;

  size: {
    name_ar: string;
    name_en: string;
    name: string;
    [key: `name_${string}`]: string;
  };
}
export const getColumns = (
  t: ReturnType<typeof useTranslations>,
  lang: string
): ColumnDef<IVariantStock>[] => [
  {
    header: "#",
    accessorKey: "id",
  },
  {
    header: t("date"),
    accessorKey: "createdAt",
    cell: ({ row }) =>
      row.original.createdAt ? formatDateTime(row.original.createdAt) : "",
  },

  {
    header: t("quantity"),
    accessorKey: "quantity",
  },
  {
    header: t("price"),
    accessorKey: "price",
    cell: ({ row }) =>
      row.original.price ? row.original.price.toString() : "",
  },
  {
    header: t("color"),
    accessorKey: "color",
    cell: ({ row }) =>
      row.original.color ? row.original.color[`name_${lang}`] : "__ ",
  },
  {
    header: t("size"),
    accessorKey: "size.name",
    cell: ({ row }) => row.original.size?.name ?? "__",
  },
  {
    header: t("warehouse"),
    accessorKey: "warehouse.name",
    cell: ({ row }) => row.original.warehouse?.name,
  },
];
