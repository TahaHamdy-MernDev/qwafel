"use client";
import Image from "@/components/reusable/Image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import EditCategoryForm from "./actions/update-category";
import { formatDateTime } from "@/common/format-date";
import DeleteCategory from "./actions/delete-category";
interface ICategory {
  id: number;
  name_ar: string;
  name_en: string;
  is_active: boolean;
  image?: string;
  createdAt: string;
  updated_at?: string;
}
export const getColumns = (
  t: ReturnType<typeof useTranslations>,
  lang: string
): ColumnDef<ICategory>[] => [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "createdAt",
    header: t("date"),
    cell: ({ row }) => formatDateTime(row.original.createdAt),
  },
  {
    accessorKey: `name_${lang}`,
    header: t("name"),
  },
  {
    accessorKey: "image",
    header: t("default_image_alt"),
    cell: ({ row }) => (
      <div className=" flex items-center justify-center">
        <Image
          width={60}
          height={60}
          className="rounded-lg size-16 object-cover"
          src={row.getValue("image") ?? null}
          alt={row.getValue(`name_${lang}`)}
        />
      </div>
    ),
  },
  {
    accessorKey: "is_active",
    header: t("status"),

    cell: ({ row }) => {
      const is_active = row.original.is_active.toString();
      return (
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
                <SelectItem value="true">{t("active")}</SelectItem>
                <SelectItem value="false">{t("inactive")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "actions",
    header: t("actions"),
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex items-center justify-center gap-2">
          {/*  */}
          <EditCategoryForm category={category} />
          <DeleteCategory category={category} />
        </div>
      );
    },
  },
];
