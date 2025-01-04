"use client";
import React, { useState } from "react";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateStockLogMutation,
  useUpdateStockLogMutation,
} from "@/redux/services/purchases/stock-logs-api";
import useCountry from "@/hooks/use-country";
import { IStockLog } from "@/types/stock-logs-types";
import { Edit2 } from "lucide-react";
const stockLogSchema = z.object({
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d*\.?\d+$/, "Invalid price format"),
  quantity: z
    .string()
    .min(1, "Quantity is required")
    .regex(/^\d+$/, "Must be a whole number"),
  productId: z
    .string()
    .min(1, "required")
    .regex(/^\d+$/, "Must be a whole number"),
  warehouseId: z
    .string()
    .min(1, "required")
    .regex(/^\d+$/, "Must be a whole number"),
  variantId: z.string().optional(),
  supplierId: z
    .string()
    .min(1, "required")
    .regex(/^\d+$/, "Must be a whole number"),
  status: z.enum(["new", "sell", "damaged"], {
    required_error: "Please select a status",
  }),
});
type StockLogInputs = z.infer<typeof stockLogSchema>;

export default function UpdateStockLog({ stockLog }: Readonly<{ stockLog: IStockLog }>) {
  const { toast } = useToast();
  const [updateStockLog, { isLoading }] = useUpdateStockLogMutation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations("Pages.Stock_logs");
  const global = useTranslations("global");
  const country = useCountry();

  const stockLogForm = useForm<StockLogInputs>({
    resolver: zodResolver(stockLogSchema),
    mode: "onChange",
    defaultValues: {
      price: stockLog?.price.toString(),
      quantity: stockLog?.quantity.toString(),
      productId: stockLog?.productId.toString(),
      warehouseId: stockLog?.warehouseId?.toString(),
      variantId: stockLog?.variant.id.toString(),
      status: stockLog?.status as "new" | "sell" | "damaged",
      supplierId: stockLog?.supplierId.toString(),
    },
  });

  const onSubmit = async (formData: StockLogInputs) => {
    try {
      const payload = {
        ...formData,
        variantId: formData.variantId ?? "",
      };

      await updateStockLog({ id: stockLog.id, country, payload }).unwrap();

      toast({
        description: global("updated_successfully"),
      });
      stockLogForm.reset();
      setIsOpen(false);
    } catch (err) {
      toast({
        description: err?.data?.message || global("error_occurred"),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* <Button size={"flat_main"}>{global("add_new")}</Button> */}
        <Button variant={"link"}>
          <Edit2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("edit_stock_log")}</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <Form {...stockLogForm}>
          <form onSubmit={stockLogForm.handleSubmit(onSubmit)} className="">
            <FormField
              name="price"
              control={stockLogForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("price")}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="quantity"
              control={stockLogForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("quantity")}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="productId"
              control={stockLogForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("product")}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="warehouseId"
              control={stockLogForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("warehouse")}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="variantId"
              control={stockLogForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("variant")}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="supplierId"
              control={stockLogForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("supplier")}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="status"
              control={stockLogForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("status")}</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={global("choose")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="new">{t("new")}</SelectItem>
                      <SelectItem value="sell">{t("sell")}</SelectItem>
                      <SelectItem value="damaged">{t("damaged")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-start">
              <Button type="submit" isLoading={isLoading}>
                {global("update")}
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => stockLogForm.reset()}
                >
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
