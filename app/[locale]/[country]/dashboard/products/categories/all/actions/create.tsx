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
import React, { useState } from "react";
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
import { useCreateCategoryMutation } from "@/redux/services/products/category-api";
const createCategorySchema = z.object({
  name_ar: z.string().min(1, "Name is required"),
  name_en: z.string().min(1, "Name is required"),
  is_active: z.boolean(),
  image: z.custom<File[]>(),
});

type CreateCategoryInputs = z.infer<typeof createCategorySchema>;
export default function CreateCategoryForm() {
  const { toast } = useToast();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const t = useTranslations("Pages.Categories");
  const global = useTranslations("global");
  const res_status = useTranslations("res_status");
  const status = useTranslations("status");
  const [uploadedCategoryImage, setUploadedCategoryImage] = useState<File[]>(
    []
  );

  const createForm = useForm<CreateCategoryInputs>({
    resolver: zodResolver(createCategorySchema),
    mode: "onChange",
    defaultValues: {
      name_ar: "",
      name_en: "",
      is_active: true,
      image: undefined,
    },
  });

  const handleFileChange = (files: File[]) => {
    setUploadedCategoryImage(files);
    console.log("Updated Files:", files);
  };
  const onSubmitCreate = async (formData: CreateCategoryInputs) => {
    formData = {
      ...formData,
      image: uploadedCategoryImage,
    };
    await createCategory(formData)
      .unwrap()
      .then(() => {
        toast({
          description: res_status("created_successfully"),
        });
        createForm.reset();
        handleFileChange([]);
      })
      .catch((err) => {
        toast({
          description: err?.data?.message || "An error occurred!",
        });
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t("add")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("add_new_category")}</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <Form {...createForm}>
          <form
            onSubmit={createForm.handleSubmit(onSubmitCreate)}
            className="space-y-4"
          >
            <FormField
              name="name_ar"
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
              name="name_en"
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
              name="is_active"
              control={createForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{status("status")}</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={field.value?.toString()}
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
              control={createForm.control}
              render={() => (
                <FormItem>
                  <FormLabel>{global("upload_image")}</FormLabel>
                  <FormControl>
                    <ImageUploader
                      multiple={false}
                      className="!max-w-full !min-h-[7rem]"
                      onFileChange={handleFileChange}
                      max={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-start">
              <Button type="submit" isLoading={isLoading}>
                {t("create")}
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
