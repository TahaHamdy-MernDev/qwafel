"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCountry from "@/hooks/use-country";
import {
  IWarehouse,
  useGetWarehousesQuery,
} from "@/redux/services/inventory/warehouses-api";
import { useGetColorsQuery } from "@/redux/services/products/colors-api";
import { useGetSizesQuery } from "@/redux/services/products/sizes-api";
import { IVariant } from "@/types/variants-types";
import { zodResolver } from "@hookform/resolvers/zod";

import { PlusIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { ISize } from "../sizes/column";

import { IColor as OriginalIColor } from "../colors/columns";
import { useState } from "react";

interface IColor extends OriginalIColor {
  [key: `name_${string}`]: string;
}
const variantSchema = z.object({
  price: z.number().min(1, "Price must be at least 1"),
  quantity: z.number().min(0, "Quantity cannot be negative"),
  warehouseId: z.string(),
  sizeId: z.string(),
  colorId: z.string(),
});

export default function VariantForm({
  onSubmit,
  defaultValues,
  type,
}: Readonly<{
  onSubmit: (data: z.infer<typeof variantSchema>) => void;
  defaultValues?: IVariant;
  type: "create" | "edit";
}>) {
  const country = useCountry();
  const t = useTranslations("Pages.Variants");
  const global = useTranslations("global");
  const lang = useLocale();
  const { data: colorData } = useGetColorsQuery({ page: 1 });
  const { data: sizeData } = useGetSizesQuery({ page: 1 });
  const { data: warehousesData } = useGetWarehousesQuery({
    page: 1,
    country: country ?? undefined,
  });
  const colors = colorData?.data;
  const sizes = sizeData?.data;
  const warehouses = warehousesData?.data;
const [isOpen, setIsOpen]= useState<boolean>(false)
  const form = useForm<z.infer<typeof variantSchema>>({
    resolver: zodResolver(variantSchema),
    mode: "onChange",
    defaultValues: {
      price: defaultValues?.price ?? 0,
      quantity: defaultValues?.quantity ?? 0,
      warehouseId: defaultValues?.warehouseId ?? " ",
      sizeId: defaultValues?.sizeId ?? " ",
      colorId: defaultValues?.colorId ?? " ",
    },
  });

  const handleClick = () => {
    const formData = form.getValues();
    //get the name of selected id
    const warehouseName = warehouses?.find((warehouse) => warehouse.id === Number(formData.warehouseId))?.name;
    const colorName = colors?.find((color) => color.id === Number(formData.colorId))?.[`name_${lang}`];
    const sizeName = sizes?.find((size) => size.id === Number(formData.sizeId))?.name;
    const data = {
      ...formData,
      warehouse: warehouseName,
      size: sizeName,
      color: colorName,
    };
    console.log(data);
    onSubmit(data);
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger asChild>
        <Button className="flex items-center justify-center">
          <PlusIcon className="text-white" /> {global("add_new")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("add_new_variant")}</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <FormField
          name="price"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("price")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="quantity"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("quantity")}</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="warehouseId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("warehouse")}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={global("choose")} />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouses?.map((warehouse: IWarehouse) => (
                      <SelectItem
                        key={warehouse.id}
                        value={warehouse.id?.toString() ?? ""}
                      >
                        {warehouse.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Size Dropdown */}
        <FormField
          name="sizeId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("size")}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={global("choose")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={" "}>
                      {global("not_available")}
                    </SelectItem>

                    {sizes?.map((size :ISize) => (
                      <SelectItem
                        key={size.id}
                        value={size.id?.toString() ?? ""}
                      >
                        {size.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Color Dropdown */}
        <FormField
          name="colorId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("color")}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("select_color")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={" "}>
                      {global("not_available")}
                    </SelectItem>

                    {colors?.map((color :IColor) => (
                      <SelectItem
                        key={color.id}
                        value={color?.id?.toString() ?? ""}
                      >
                        {color[`name_${lang}`]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          {/* <Button type="submit">{global("add_new")}</Button> */}
          <Button onClick={handleClick}>{global("add_new")}</Button>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              {global("cancel")}
            </Button>
          </DialogClose>
        </DialogFooter>
        {/* </form> */}
        {/* </Form> */}
      </DialogContent>
    </Dialog>
  );
}
