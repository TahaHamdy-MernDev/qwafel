"use client";
import ExcelButton from "@/components/excel-button";
import Image from "@/components/reusable/Image";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";

import React, { useState } from "react";

const AllTable: React.FC = () => {
  const t = useTranslations("Products");

  const exportToExcel = () => {
    console.log("Export to Excel");
  };

  const data = [
    {
      id: 1,
      date: "2024-12-01",
      product: "Wireless Mouse",
      price: "$25",
      currentStock: 100,
      sellerCommission: "$5",
      systemCommission: "$2.5",
      seller: "TechShop",
    },
    {
      id: 2,
      date: "2024-12-02",
      product: "Mechanical Keyboard",
      price: "$75",
      currentStock: 50,
      sellerCommission: "$10",
      systemCommission: "$5",
      seller: "KeyMasters",
    },
    {
      id: 3,
      date: "2024-12-03",
      product: "Gaming Chair",
      price: "$150",
      currentStock: 20,
      sellerCommission: "$25",
      systemCommission: "$12.5",
      seller: "FurniturePro",
    },
  ];
  const [selected, setSelected] = useState<number[]>([]);

  // Handle checkbox toggle
  const toggleSelection = (userId: number) => {
    setSelected((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };
  // Handle select all toggle
  const toggleSelectAll = () => {
    if (selected.length === data.length) {
      setSelected([]);
    } else {
      setSelected(data.map((item) => item.id));
    }
  };
  const isSelected = (item_id: number) => selected.includes(item_id);
  const isAllSelected = selected.length === data.length;
  const status = [
    { label: t("status.active"), value: "active" },
    { label: t("status.inactive"), value: "inactive" },
  ];
  return (
    <div className="mt-4 flex flex-col">
      <div className="flex items-center justify-start">
        <ExcelButton onClick={exportToExcel} disabled={false} />
      </div>
      <div className="mt-4 card">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>{t("column.date")}</TableHead>
              <TableHead className="max-w-20">{t("column.product")}</TableHead>
              <TableHead>{t("column.price")}</TableHead>
              <TableHead>{t("column.current_stock")}</TableHead>
              <TableHead>{t("column.seller_commission")}</TableHead>
              <TableHead>{t("column.system_commission")}</TableHead>
              <TableHead>{t("status.status")}</TableHead>
              <TableHead>{t("column.seller")}</TableHead>
              <TableHead>{t("column.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index + 1}>
                <TableCell>
                  <Checkbox
                    checked={isSelected(item.id)}
                    onCheckedChange={() => toggleSelection(item.id)}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <div>11:50pm</div>
                  {item.date}{" "}
                </TableCell>
                <TableCell>
                  <div className="flex items-start justify-start gap-2">
                    <Image
                      width={60}
                      height={60}
                      alt={item.product}
                      src="https://placehold.co/60x60"
                      className=" rounded-lg"
                    />
                    <div className=" text-start break-words">
                      #{item.id}
                      <br />
                      {item.product}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.currentStock}</TableCell>
                <TableCell>{item.sellerCommission}</TableCell>
                <TableCell>{item.systemCommission}</TableCell>
                <TableCell>
                  {/* <Select
            options={status}
            placeholder={t("status.status")}
            control={control}
            onValueChange={()=>console.log("tttttt")}
            // {...register("status")} 
          />
            */}
                </TableCell>
                <TableCell>{item.seller}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllTable;
