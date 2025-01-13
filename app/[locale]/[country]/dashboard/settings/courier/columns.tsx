import { formatDateTime } from "@/common/format-date";
import { ICourier } from "@/redux/services/settings/courier-api";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import EditCourier from "./actions/edit-courier";
import DeleteCourier from "./actions/delete-courier";

export const getColumns = (
  t: ReturnType<typeof useTranslations>
): ColumnDef<ICourier>[] => [
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
    header: t("courier_api_key"),
    accessorKey: "courier_api_key",
  },
  {
    header: t("our_api_key"),
    accessorKey: "our_api_key",
  },

  {
    header: t("actions"),
    accessorKey: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <EditCourier courier={row.original} />
        <DeleteCourier courier={row.original} />
      </div>
    ),
  },
];
