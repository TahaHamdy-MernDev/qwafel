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
import { useCreateWarehouseMutation } from "@/redux/services/inventory/warehouses-api";
import useCountry from "@/hooks/use-country";
import { useTranslations } from "next-intl";
const createSize = z.object({
  name: z.string().min(1).max(20),
});
type formInputs = z.infer<typeof createSize>;
export default function CreateWarehouse() {
  const t = useTranslations("Pages.Inventory");
  const { toast } = useToast();
  const country = useCountry();
  const [createWarehouse, { isLoading }] = useCreateWarehouseMutation();
  const global = useTranslations("global");
  const res_status = useTranslations("res_status");
  const createForm = useForm<formInputs>({
    resolver: zodResolver(createSize),
    mode: "onChange",
    defaultValues: { name: "" },
  });
  const onSubmitCreate = async (data: formInputs) => {
    await createWarehouse({
      payload: data,
      country: country ?? undefined,
    })
      .unwrap()
      .then(() => {
        toast({
          description: res_status("created_successfully"),
        });
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
        <Button size={"flat_main"}>{global("add_new")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("add_new_warehouse")}</DialogTitle>
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
            <DialogFooter>
              <Button type="submit" isLoading={isLoading}>
                {global("create")}
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
