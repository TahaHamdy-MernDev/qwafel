"use client";
import ImageUploader from "@/components/file-upload-with-preview";
import Search from "@/components/search";
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
import { getSearchCategorySchema } from "@/schemas/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getLangDir } from "rtl-detect";
import z from "zod";
const createCategorySchema = z.object({
  name: z.string().nonempty("Name is required"),
  is_active: z.enum(["true", "false"]),
  image: z
    .custom<File>(
      (file) => file instanceof File && file.size > 0,
      "Invalid image format"
    )
    .optional(),
});

type CreateCategoryInputs = z.infer<typeof createCategorySchema>;
type FormInputs = z.infer<ReturnType<typeof getSearchCategorySchema>>;

const AllCategoriesSearch: React.FC = () => {
  const [uploadedCategoryImage, setUploadedCategoryImage] = useState<File[]>(
    []
  );
  const t = useTranslations("Pages.Categories");
  const global = useTranslations("global");
  const status = useTranslations("status");
  const locale = useLocale();
  const dir = getLangDir(locale);
  const schema = getSearchCategorySchema(
    useTranslations("Validation.Categories")
  );
  const form = useForm<FormInputs>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { name: "", is_active: "false", id: "" },
  });
  const createForm = useForm<CreateCategoryInputs>({
    resolver: zodResolver(createCategorySchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      is_active: "false",
      image: undefined,
    },
  });

  const handleFileChange = (files: File[]) => {
    setUploadedCategoryImage(files);
    console.log("Updated Files:", files);
  };
  const onSubmitSearch = (formData: FormInputs) => {
    console.log("Search Data:", formData);
  };

  const onSubmitCreate = (formData: CreateCategoryInputs) => {
    console.log("Create Category Data:", formData);
  };

  return (
    <Search
      title={t("title")}
      additionalContent={
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
                  name="is_active"
                  control={createForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{status("status")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={global("choose")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">
                            {status("active")}
                          </SelectItem>
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
                  <Button type="submit">{t("create")}</Button>
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
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitSearch)}
          className=" space-y-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <FormField
              name="id"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("code")}</FormLabel>
                  <FormControl>
                    <Input {...field} className=" !w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input {...field} className=" !w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{status("status")} </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={global("choose")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent dir={dir}>
                      <SelectItem value="true">active</SelectItem>
                      <SelectItem value="false">in Active</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" w-full flex max-w-lg items-center mt-3 gap-2">
              <Button type="submit" className="w-full">
                {global("search")}
              </Button>
              <Button
                variant={"outline"}
                onClick={() => form.reset()}
                className=" w-full"
              >
                {global("reset")}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Search>
  );
};

export default AllCategoriesSearch;
