"use client";

import React from "react";
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
  Form,
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

import { useLocale, useTranslations } from "next-intl";
import { PlusIcon } from "lucide-react";
import { IWarehouse } from "@/redux/services/inventory/warehouses-api";
import { IColor as OriginalIColor } from "../colors/columns";

interface IColor extends OriginalIColor {
  [key: `name_${string}`]: string;
}
import { ISize } from "../sizes/column";

const createVariantSchema = z.object({
  price: z.number().min(1, "Price must be at least 1"),
  quantity: z.number().min(0, "Quantity cannot be negative"),
  warehouseId: z.string(),
  sizeId: z.string(),
  colorId: z.string(),
});

type FormInputs = z.infer<typeof createVariantSchema>;

export default function CreateVariant({
  productId,
  warehouses,
  colors,
  sizes,
}: Readonly<{
  productId: number | null;
  warehouses?: IWarehouse[];
  colors?: IColor[];
  sizes?: ISize[];
}>) {
  const t = useTranslations("Pages.Variants");
  const global = useTranslations("global");
  const { toast } = useToast();
const lang = useLocale()
  //   const [createVariant, { isLoading }] = useCreateVariantMutation();

  // Form
  const createForm = useForm<FormInputs>({
    resolver: zodResolver(createVariantSchema),
    mode: "onChange",
    defaultValues: {
      price: 0,
      quantity: 0,
      warehouseId: "",
      sizeId: "",
      colorId: "",
    },
  });

  // Form Submission
  const onSubmitCreate = async (data: FormInputs) => {
    console.log(data, productId);
    // await createVariant(data)
    //   .unwrap()
    //   .then(() => {
    //     toast({ description: t("created_successfully") });
    //     createForm.reset();
    //   })
    //   .catch((err) => {
    //     toast({
    //       description: err.data?.message || "Error occurred",
    //       variant: "destructive",
    //     });
    //   });
  };
  console.log(productId, warehouses, colors, sizes);

  return (
    <Dialog>
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
        <Form {...createForm}>
          <form
            onSubmit={createForm.handleSubmit(onSubmitCreate)}
            className="space-y-4"
          >
            {/* Price Field */}
            <FormField
              name="price"
              control={createForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("price")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantity Field */}
            <FormField
              name="quantity"
              control={createForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("quantity")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Warehouse Dropdown */}
            <FormField
              name="warehouseId"
              control={createForm.control}
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
              control={createForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("size")}</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder={global("choose")} />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes?.map((size) => (
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
              control={createForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("color")}</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("select_color")} />
                      </SelectTrigger>
                      <SelectContent>
                        {colors?.map((color) => (
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
              <Button
                type="submit"
           
              >
                {global("add_new")}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  {global("cancel")}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
