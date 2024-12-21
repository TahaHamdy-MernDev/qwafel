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
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import useCountry from "@/hooks/use-country";
import { useTranslations } from "next-intl";
import {
  IWarehouse,
  useUpdateWarehouseMutation,
} from "@/redux/services/inventory/warehouses-api";
import { Edit2 } from "lucide-react";
const editSchema = z.object({
  name: z.string().min(1).max(20),
});

type FormInputs = z.infer<typeof editSchema>;

export default function EditWarehouse({
  warehouse,
}: Readonly<{ warehouse: IWarehouse }>) {
  const t = useTranslations("Pages.Inventory");
  const { toast } = useToast();
  const country = useCountry();
  const [updateWarehouse, { isLoading }] = useUpdateWarehouseMutation();
  const global = useTranslations("global");
  const res_status = useTranslations("res_status");

  const editForm = useForm<FormInputs>({
    resolver: zodResolver(editSchema),
    mode: "onChange",
    defaultValues: {
      name: warehouse.name,
    },
  });

  const onSubmitEdit = async (data: FormInputs) => {
    await updateWarehouse({
      id: Number(warehouse.id),
      payload: data,
      country: country ?? undefined,
    })
      .unwrap()
      .then(() => {
        toast({
          description: res_status("updated_successfully"),
        });
      })
      .catch((err) => {
        console.log(err);
        toast({ description: err.data.message, variant: "destructive" });
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit2 className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("edit_warehouse")}</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <Form {...editForm}>
          <form
            onSubmit={editForm.handleSubmit(onSubmitEdit)}
            className="space-y-4"
          >
            <FormField
              name="name"
              control={editForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" isLoading={isLoading}>
                {global("save_changes")}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isLoading}>
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
