import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useUpdateSupplierMutation } from "@/redux/services/purchases/suppliers-api";
import { useTranslations } from "next-intl";
import { ISupplier } from "@/types/purchases-types";
import useCountry from "@/hooks/use-country";
import { Edit2 } from "lucide-react";

const updateSupplierSchema = z.object({
  name: z.string().min(1).max(50),
});

type FormInputs = z.infer<typeof updateSupplierSchema>;

export default function EditSupplier({
  supplier,
}: Readonly<{ supplier: ISupplier }>) {
  const t = useTranslations("Pages.Purchases");
  const global = useTranslations("global");
  const res_status = useTranslations("res_status");
  const { toast } = useToast();
  const [updateSupplier, { isLoading }] = useUpdateSupplierMutation();
  const country = useCountry();
  const editForm = useForm<FormInputs>({
    resolver: zodResolver(updateSupplierSchema),
    mode: "onChange",
    defaultValues: { name: supplier.name },
  });

  const onSubmitUpdate = async (data: FormInputs) => {
    await updateSupplier({
      id: supplier.id,
      payload: data,
      country: country ?? undefined,
    })
      .unwrap()
      .then(() => {
        toast({ description: res_status("updated_successfully") });
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
          <DialogTitle>{t("edit_supplier")}</DialogTitle>
        </DialogHeader>
        <Form {...editForm}>
          <form
            onSubmit={editForm.handleSubmit(onSubmitUpdate)}
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
                {global("update")}
              </Button>
              <DialogTrigger asChild>
                <Button variant="outline">{global("cancel")}</Button>
              </DialogTrigger>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
