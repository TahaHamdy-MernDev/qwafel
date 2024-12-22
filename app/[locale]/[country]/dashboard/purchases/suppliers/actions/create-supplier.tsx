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
import { useTranslations } from "next-intl";
import { useCreateSupplierMutation } from "@/redux/services/purchases/suppliers-api";
import useCountry from "@/hooks/use-country";

const createSupplierSchema = z.object({
  name: z.string().min(1).max(50),
  payable: z
    .string()
    .transform((value) => parseFloat(value))
    .refine((value) => !isNaN(value) && value >= 0, {
      message: "Payable must be a non-negative number",
    }),
});

type FormInputs = z.infer<typeof createSupplierSchema>;

export default function CreateSupplier() {
  const t = useTranslations("Pages.Purchases");
  const global = useTranslations("global");
  const res_status = useTranslations("res_status");
  const country = useCountry();
  const { toast } = useToast();
  const [createSupplier, { isLoading }] = useCreateSupplierMutation();

  const createForm = useForm<FormInputs>({
    resolver: zodResolver(createSupplierSchema),
    mode: "onChange",
    defaultValues: { name: "", payable: 0 },
  });

  const onSubmitCreate = async (data: FormInputs) => {
    await createSupplier({
      country: country ?? undefined,
      payload: data,
    })
      .unwrap()
      .then(() => {
        toast({ description: res_status("created_successfully") });
      })
      .catch((err) => {
        console.log(err);
        toast({ description: err.data.message, variant: "destructive" });
      });
    createForm.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{global("add_new")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("add_new_supplier")}</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <Form {...createForm}>
          <form
            onSubmit={createForm.handleSubmit(onSubmitCreate)}
            className="space-y-4"
          >
            <FormField
              name="name"
              control={createForm.control}
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
            <FormField
              name="payable"
              control={createForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("payable")}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" isLoading={isLoading}>
                {global("create")}
              </Button>
              <DialogTrigger asChild>
                <Button variant="outline" disabled={isLoading}>
                  {global("cancel")}
                </Button>
              </DialogTrigger>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
