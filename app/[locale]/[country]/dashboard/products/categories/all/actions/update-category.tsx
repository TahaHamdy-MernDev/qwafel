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
import ImageUploader from "@/components/file-upload-with-preview";
import React, { useEffect, useState } from "react";
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
import { useUpdateCategoryMutation } from "@/redux/services/products/category-api";
import { Edit2 } from "lucide-react";

const editCategorySchema = z.object({
  name_ar: z.string().min(1, "Name is required"),
  name_en: z.string().min(1, "Name is required"),
  is_active: z.boolean(),
  image: z.custom<File[]>(),
});

type EditCategoryInputs = z.infer<typeof editCategorySchema>;

type EditCategoryFormProps = {
  category: {
    id: number;
    name_ar: string;
    name_en: string;
    is_active: boolean;
    image?: string;
  };
};

export default function EditCategoryForm({
  category,
}: Readonly<EditCategoryFormProps>) {
  const { toast } = useToast();
  const [editCategory, { isLoading }] = useUpdateCategoryMutation();
  const t = useTranslations("Pages.Categories");
  const global = useTranslations("global");
  const res_status = useTranslations("res_status");
  const status = useTranslations("status");
  const [uploadedCategoryImage, setUploadedCategoryImage] = useState<File[]>(
    []
  );
  const editForm = useForm<EditCategoryInputs>({
    resolver: zodResolver(editCategorySchema),
    mode: "onChange",
    defaultValues: {
      name_ar: category.name_ar || "",
      name_en: category.name_en || "",
      is_active: category.is_active,
      image: undefined,
    },
  });

  useEffect(() => {
    if (category.image) {
      setUploadedCategoryImage([]);
    }
  }, [category]);

  const handleFileChange = (files: File[]) => {
    setUploadedCategoryImage(files);
    console.log("Updated Files:", files);
  };

  const onSubmitEdit = async (formData: EditCategoryInputs) => {
    formData = {
      ...formData,
      image: uploadedCategoryImage.length ? uploadedCategoryImage : undefined,
    };
    console.log("Edit Category Data:", formData);
    await editCategory({ id: category.id, ...formData })
      .unwrap()
      .then(() => {
        toast({
          description: res_status("updated_successfully"),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit2 className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("edit_category")}</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <Form {...editForm}>
          <form
            onSubmit={editForm.handleSubmit(onSubmitEdit)}
            className="space-y-4"
          >
            <FormField
              name="name_ar"
              control={editForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name_ar")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="name_en"
              control={editForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name_en")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="is_active"
              control={editForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{status("status")}</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={global("choose")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">{status("active")}</SelectItem>
                      <SelectItem value="false">
                        {status("inactive")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="image"
              control={editForm.control}
              render={() => (
                <FormItem>
                  <FormLabel>{global("upload_image")}</FormLabel>
                  <FormControl>
                    <ImageUploader
                      multiple={false}
                      className="!max-w-full !min-h-[7rem]"
                      onFileChange={handleFileChange}
                      max={1}
                      defaultImage={category.image}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-start">
              <Button type="submit" isLoading={isLoading}>
                {global("confirm")}
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
