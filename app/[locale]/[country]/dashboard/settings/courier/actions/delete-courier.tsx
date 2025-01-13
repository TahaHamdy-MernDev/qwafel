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
  ICourier,
  useDeleteCourierMutation,
} from "@/redux/services/settings/courier-api";
import { useTranslations } from "next-intl";
import useCountry from "@/hooks/use-country";
import { Trash2 } from "lucide-react";
export default function DeleteCourier({
  courier,
}: Readonly<{ courier: ICourier }>) {
  const country = useCountry();
  const t = useTranslations("Pages.Settings");
  const global = useTranslations("global");
  const res_status = useTranslations("res_status");
  const { toast } = useToast();
  const [deleteCourier, { isLoading }] = useDeleteCourierMutation();

  const handleDelete = async () => {
    await deleteCourier({
      id: courier.id,
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
          <DialogTitle>{t("delete_courier")}</DialogTitle>
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
