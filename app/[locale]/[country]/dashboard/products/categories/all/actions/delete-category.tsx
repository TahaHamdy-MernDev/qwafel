import Image from "@/components/reusable/Image";
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
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { Button } from "@/components/ui/button"; 
import { useDeleteCategoryMutation } from "@/redux/services/products/category-api";
import { useToast } from "@/hooks/use-toast";

type DeleteCategoryFormProps = {
  category: {
    id: number;
    name_ar: string;
    name_en: string;
    is_active: boolean;
    image?: string;
  };
};

export default function DeleteCategory({
  category,
}: Readonly<DeleteCategoryFormProps>) {
  const t = useTranslations("Pages.Categories");
  const { toast } = useToast();

  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    try {
      await deleteCategory(category.id).unwrap();
      toast({
        description: t("success_message"),
      });
    } catch (err) {
      console.log(err);
      toast({
        description: t("error_message"),
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2
          className="cursor-pointer text-destructive hover:text-red-900 transition-all duration-200"
          aria-label={t("delete_category")}
        />
      </DialogTrigger>
      <DialogContent aria-labelledby="delete-dialog-title">
        <DialogHeader>
          <DialogTitle className="text-center">
            {t("message", {
              name: category.name_ar || category.name_en,
            })}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {t("permanently_delete")}
        <div className="flex justify-center mt-4">
          <Image
            width={60}
            height={60}
            alt={category.name_en || t("default_image_alt")}
            src={category.image}
            className="rounded-lg"
          />
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            isLoading={isLoading}
            variant="destructive"
            onClick={handleDelete}
          >
            {t("confirm")}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              {t("cancel")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
