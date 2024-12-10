"use client";

import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import ImageUploader from "@/components/file-upload-with-preview";
import { Input } from "@/components/ui/input";
import { useLocale, useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getLangDir } from "rtl-detect";

export default function Page() {
  const t = useTranslations("Products");
  const global = useTranslations("global");
  const locale = useLocale();
  const dir = getLangDir(locale);
  const formSchema = z.object({
    title: z.string(),
    description: z
      .string()
      .min(1, { message: "Description is required" })
      .max(99999, { message: "Description is too long" })
      .trim(),
    categoryId: z.string(),
    external_url: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      external_url: "",
    },
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileChange = (files: File[]) => {
    setUploadedFiles(files);
    console.log("Updated Files:", files);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Final Uploaded Files:", uploadedFiles);
    console.log(values)
  }

  return (
 
    <div className="flex flex-col p-4">
      <div className="bg-white p-4 drop-shadow-lg rounded-lg">
        <div className="mb-4">
          <h2 className=" text-2xl text-black font-semibold">
            {" "}
            {t("create_new_product")}
         </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("title")}</FormLabel>
                  <FormControl>
                    <Input {...field} className=" !w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="external_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("external_url")}</FormLabel>
                  <FormControl>
                    <Input {...field} className=" !w-full" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("category")} </FormLabel>
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
                      <SelectItem value="1">cat2</SelectItem>
                      <SelectItem value="2">cat3</SelectItem>
                      <SelectItem value="3">cat</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("description")}</FormLabel>
                  <FormControl>
                    <RichTextEditor {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className=" flex flex-col md:flex-row w-full gap-2">
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem className=" w-full">
                    <FormLabel>{t("thumbnail")}</FormLabel>
                    <FormControl>
                      <ImageUploader
                        className="!max-w-full"
                        onFileChange={handleFileChange}
                        multiple={false}
                        max={1}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className=" w-full">
                    <FormLabel>{t("product_images")}</FormLabel>
                    <FormControl>
                      <ImageUploader
                        className="!max-w-full"
                        onFileChange={handleFileChange}
                        multiple={true}
                        max={10}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">{t("create")}</Button>
          </form>
        </Form>
      </div>
    </div>
    
  );
}
