"use client"
import { formatDateTime } from "@/common/format-date";
import { ISupplier } from "@/types/purchases-types";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import EditSupplier from "./actions/edit-supplier";
import DeleteSupplier from "./actions/delete-supplier";

export const getColumns = (
  t: ReturnType<typeof useTranslations>
): ColumnDef<ISupplier>[] => [
    {
        header:"#" ,
        accessorKey: "id",
    },
    {
        header: t("date"),
        accessorKey: "createdAt",
        cell: ({ row }) => formatDateTime(row.original.createdAt),
    },
    {
        header: t("name"),
        accessorKey: "name",
    },{
        header: t("actions"),
        accessorKey: "actions",
        cell: ({ row }) => (
            <div className="flex items-center justify-center gap-2">
                <EditSupplier supplier={row.original} />
                <DeleteSupplier supplier={row.original} />
            </div>
        ),
    }
];
