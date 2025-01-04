"use client";
import { formatDateTime } from "@/common/format-date";
import Image from "@/components/reusable/Image";
import { IStockLog } from "@/types/stock-logs-types";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import UpdateStockLog from "./actions/update";
import DeleteStockLogConfirmation from "./actions/delete";

export const getStockLogsColumns = (
  t: ReturnType<typeof useTranslations>,
  lang: string
): ColumnDef<IStockLog>[] => [
  {
    header: "#",
    accessorKey: "id",
  },
  {
    header: t("date"),
    accessorKey: "createdAt",
    cell: ({ row }) => formatDateTime(row.original.createdAt),
  },
  {
    header: t("thumbnail"),
    accessorKey: "product.image",
    size: 50,
    cell: ({ row }) => (
      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <Image
          width={40}
          height={40}
          src={row.original.product.thumbnail}
          alt={"product-image"}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    header: t("product"),
    accessorKey: "product",
    size: 200,
    cell({ row }) {
      return (
        <div className="flex flex-col items-center justify-center gap-1">
          {row.original.product[`title_${lang}`]}
          <span>
            (#{row.original.productId}) {row.original.variant.sku}
          </span>
        </div>
      );
    },
  },
  {
    header: t("quantity"),
    accessorKey: "quantity",
    cell: ({ row }) => row.original.quantity.toString(),
  },
  {
    header: t("price"),
    accessorKey: "price",
    cell: ({ row }) => row.original.price.toString(),
  },
  {
    header: t("status"),
    accessorKey: "status",
    cell: ({ row }) => t(row.original.status),
  },
  {
    header: t("actions"),
    accessorKey: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-2">
          <UpdateStockLog stockLog={row.original} />
          {/* <DeleteStockLogConfirmation id={row.original.id} /> */}
          {/* <StockLogForm type="update" initialValues={log} /> */}
        </div>
      );
    },
  },
];
