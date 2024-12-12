"use client";
import ExcelButton from "@/components/excel-button";
import Image from "@/components/reusable/Image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Trash2 } from "lucide-react";
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
    <div className="">
      <div className="mt-4 flex flex-col">
        <div className="flex items-center justify-start">
          <ExcelButton onClick={exportToExcel} disabled={false} />
        </div>
        <div className="mt-4  ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>

                <TableHead className=" max-w-[2rem]">
                  {t("column.product")}
                </TableHead>
                <TableHead>{t("column.price")}</TableHead>
                <TableHead>{t("column.current_stock")}</TableHead>
                <TableHead>{t("column.seller")}</TableHead>
                <TableHead>{t("status.status")}</TableHead>
                <TableHead>{t("column.date")}</TableHead>
                <TableHead className=" w-20">{t("column.actions")}</TableHead>
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

                  <TableCell className=" max-w-[9rem]">
                    <div className="flex items-center gap-2 justify-start">
                      <Image
                        width={60}
                        height={60}
                        alt={item.product}
                        src="https://placehold.co/60x60"
                        className=" rounded-lg"
                      />
                      <div className=" rtl:text-start ltr:text-end break-words">
                        #{item.id}
                        <br />
                        sku{item.id}
                        <br />
                        <span className=" truncate">{item.product}</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.currentStock}</TableCell>
                  <TableCell>{item.seller}</TableCell>
                  <TableCell className=" min-w-[10rem]">
                    <Select
                      onValueChange={(value) => console.log(value)}
                      defaultValue={"active"}
                    >
                    
                      <SelectTrigger className="h-10 !border-gray-600">
                        <SelectValue placeholder={"active"} />
                      </SelectTrigger>
                     
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inActive">inActive</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-center">
                    <div>11:50pm</div>
                    {item.date}{" "}
                  </TableCell>
                  <TableCell className=" w-20">
                    <div className=" flex items-center justify-center gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            id="delete-product"
                            variant="outline"
                            className="border-none p-0 !size-7 text-lg"
                          >
                            <Trash2 className="cursor-pointer text-destructive hover:text-red-900 transition-all duration-200" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent dir="rtl">
                          <AlertDialogHeader>
                            <AlertDialogTitle className=" text-center">
                              {t("delete.message")}
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                              {t("delete.permanently_delete")}
                            </AlertDialogDescription>

                            <div className="flex ltr:justify-end rtl:justify-start mt-4">
                              <Image
                                width={60}
                                height={60}
                                alt="tessss"
                                src="https://placehold.co/60x60"
                                className=" rounded-lg"
                              />
                            </div>
                          </AlertDialogHeader>
                          <AlertDialogFooter className=" gap-2">
                            <AlertDialogCancel>
                              {t("delete.cancel")}
                            </AlertDialogCancel>

                            <AlertDialogAction>
                              {t("delete.confirm")}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <Eye className="cursor-pointer size-6 text-gray-500" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div> 
      </div>
    </div>
  );
};

export default AllTable;
