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
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";
import { useDeleteStockLogMutation } from "@/redux/services/purchases/stock-logs-api";
import useCountry from "@/hooks/use-country";

export default function DeleteStockLogConfirmation({
  id,
}: Readonly<{ id: number }>) {
  const { toast } = useToast();
  const country = useCountry();
  const t = useTranslations("Pages.Stock_logs");
  const global = useTranslations("global");
  const [isOpen, setIsOpen] = useState(false);
  const [deleteStockLog, { isLoading }] = useDeleteStockLogMutation();
  const handleDelete = async () => {
    try {
      await deleteStockLog({
        id,
        country,
      }).unwrap();
      toast({
        description: global("deleted_successfully"),
      });
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
        <Button variant={"link"}>
          <Trash2 className="text-destructive" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {t("delete_stock_log")}
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <DialogDescription>{t("delete_confirmation")}</DialogDescription>

        <DialogFooter>
          <Button
            variant="destructive"
            isLoading={isLoading}
            onClick={handleDelete}
          >
            {global("delete")}
          </Button>
          <DialogClose asChild>
            <Button variant="outline">{global("cancel")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
