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
import { useToast } from "@/hooks/use-toast";
import {
  IWarehouse,
  useDeleteWarehouseMutation,
} from "@/redux/services/inventory/warehouses-api";
import { useTranslations } from "next-intl";
import useCountry from "@/hooks/use-country";
import { Trash2 } from "lucide-react";
export default function DeleteWarehouse({
  warehouse,
}: Readonly<{ warehouse: IWarehouse }>) {
  const country = useCountry();
  const t = useTranslations("Pages.Inventory");
  const global = useTranslations("global");
  const res_status = useTranslations("res_status");
  const { toast } = useToast();
  const [deleteWarehouse, { isLoading }] = useDeleteWarehouseMutation();

  const handleDelete = async () => {
    await deleteWarehouse({
      id: warehouse.id,
      country: country ?? undefined,
    })
      .unwrap()
      .then(() => {
        toast({
          description: res_status("deleted_successfully"),
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
        <Trash2 className="cursor-pointer text-destructive hover:text-red-900 transition-all duration-200" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("delete_warehouse")}</DialogTitle>
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
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              {global("cancel")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
