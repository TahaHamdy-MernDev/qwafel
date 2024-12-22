import { formatDateTime } from "@/common/format-date";
import { IWarehouse } from "@/redux/services/inventory/warehouses-api";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import EditWarehouse from "./actions/edit-warehouse";
import DeleteWarehouse from "./actions/delete-warehouse";

export const getColumns = (
  t: ReturnType<typeof useTranslations>
): ColumnDef<IWarehouse>[] => [
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
    header: t("name"),
    accessorKey: "name",
  },
  
  {
    header: t("actions"),
    accessorKey: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <EditWarehouse warehouse={row.original} />
          <DeleteWarehouse warehouse={row.original} />
      </div>
    ),
  },

];
