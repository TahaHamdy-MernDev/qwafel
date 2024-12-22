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
import { useToast } from "@/hooks/use-toast";
import { useDeleteSupplierMutation } from "@/redux/services/purchases/suppliers-api";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";
import { ISupplier } from "@/types/purchases-types";
import useCountry from "@/hooks/use-country";

export default function DeleteSupplier({
  supplier,
}: Readonly<{ supplier: ISupplier }>) {
  const country = useCountry();
const t = useTranslations("Pages.Purchases");
  const global = useTranslations("global");
  const res_status = useTranslations("res_status");
  const { toast } = useToast();
  const [deleteSupplier, { isLoading }] = useDeleteSupplierMutation();

  const handleDelete = async () => {
    await deleteSupplier({
      id: supplier.id,
      country: country ?? undefined,
    })
      .unwrap()
      .then(() => {
        toast({ description: res_status("deleted_successfully") });
      })
      .catch((err) => {
        console.log(err);
        toast({ description: err.data.message, variant: "destructive" });
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2 className="cursor-pointer text-destructive hover:text-red-900 transition-all duration-200" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("delete_supplier")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{t("delete_confirmation")}</DialogDescription>
        <DialogFooter>
          <Button
            variant="destructive"
            isLoading={isLoading}
            onClick={handleDelete}
          >
            {global("confirm")}
          </Button>
          <DialogTrigger asChild>
            <Button variant="outline">{global("cancel")}</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
