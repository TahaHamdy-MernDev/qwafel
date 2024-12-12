"use client";
import Image from "@/components/reusable/Image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
export interface ICategory {
  id: number;
  name: string;
  image: string;
  is_active: boolean;
  created_at: string;
}

export const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className=" flex items-center justify-center">
        <Image
          width={60}
          height={60}
          src={row.getValue("image")}
          className="rounded-lg"
          alt={row.getValue("name")}
        />
      </div>
    ),
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      const is_active = row.original.is_active.toString();
      return (
        <Select
          onValueChange={(value) => console.log(value)}
          defaultValue={is_active}
        >
          <SelectTrigger className=" h-10 !border-gray-600">
            <SelectValue placeholder={"active"} />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">inActive</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    // cell: ({ value }) => new Date(value).toLocaleDateString("en-US")
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="flex items-center justify-center gap-2">
          <Edit2 className="cursor-pointer" />

          <Dialog>
            <DialogTrigger asChild>
              <Trash2 className="cursor-pointer text-destructive hover:text-red-900 transition-all duration-200" />
            </DialogTrigger>
            <DialogContent dir="rtl">
              <DialogHeader>
                <DialogTitle className=" text-center">
                  {/* {t("delete.message")} */}
                </DialogTitle>

                <DialogDescription>
                  {/* {t("delete.permanently_delete")} */}
                </DialogDescription>

                <div className="flex ltr:justify-end rtl:justify-start mt-4">
                  <Image
                    width={60}
                    height={60}
                    alt="tessss"
                    src="https://placehold.co/60x60"
                    className=" rounded-lg"
                  />
                </div>
              </DialogHeader>
              <DialogFooter className=" gap-2">
                <DialogClose>Cancel</DialogClose>

                <Button>confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
