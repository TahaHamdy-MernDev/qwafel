"use client";
import { formatDateTime } from "@/common/format-date";
import Image from "@/components/reusable/Image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

export interface IProduct {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  categoryId: number | string;
  external_url: string;
  thumbnail: string;
  is_active: boolean;
  quantity: number;
  images: string[];
  meta_description: string;
  createdAt: string;
  [key: string]: unknown;
}
export const getColumns = (
  t: ReturnType<typeof useTranslations>,
  lang: string
): ColumnDef<IProduct>[] => [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    header: t("column.date"),
    accessorKey: "createdAt",
    cell: ({ row }) => formatDateTime(row.original.createdAt),
  },
  {
    header: t("column.thumbnail"),
    accessorKey: "thumbnail",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Image
          width={60}
          height={60}
          src={row.original.thumbnail}
          alt={t("thumbnail")}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    header: t("column.product"),
    accessorKey: `title_${lang}`,
    cell: ({ row }) => (
      <span className="text-sm text-gray-900 dark:text-gray-100">
        #{row.original.id + "" + row.original[`title_${lang}`]}
      </span>
    ),
  },
  {
    header: t("column.quantity"),
    accessorKey: "quantity",
  },
  {
    header: t("column.status"),
    accessorKey: "is_active",
    cell: ({ row }) => {
      const is_active = row.original.is_active.toString();
    return(
        <div className="w-full flex items-center justify-center">
        <div className="w-[200px]">
          <Select
            onValueChange={(value) => console.log(value)}
            defaultValue={is_active.toString()}
          >
            <SelectTrigger className=" h-10 !border-gray-600">
              <SelectValue placeholder={"active"} />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="true">{t("column.active")}</SelectItem>
              <SelectItem value="false">{t("column.inactive")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    )
    },
  },
  {
    header: t("column.actions"),
    accessorKey: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {/* <EditProductForm product={row.original} />
        <DeleteProduct product={row.original} /> */}
      </div>
    ),
  },
];
