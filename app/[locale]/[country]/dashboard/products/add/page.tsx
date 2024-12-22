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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getLangDir } from "rtl-detect";
import { Separator } from "@/components/ui/separator";
import { useGetCategoriesQuery } from "@/redux/services/products/category-api";
import { useCreateProductMutation } from "@/redux/services/products/products-api";
import useCountry from "@/hooks/use-country";
import { useToast } from "@/hooks/use-toast";
import Link from "@/components/reusable/Link";
import { Card } from "@/components/ui/card";
const formSchema = z.object({
  title_ar: z.string(),
  title_en: z.string(),
  description_ar: z.string().min(1).max(99999).trim(),
  description_en: z.string().min(1).max(99999).trim(),
  categoryId: z.string(),
  is_active: z.boolean(),
  external_url: z.string(),
  thumbnail: z.custom<File[]>(),
  images: z.custom<File[]>(),
  meta_description_ar: z.string(),
  meta_description_en: z.string(),
});
export default function Page() {
  const { toast } = useToast();
  const { data } = useGetCategoriesQuery({ page: 1 });
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const res_status = useTranslations("res_status");
  const status = useTranslations("status");
  const t = useTranslations("Products");
  const global = useTranslations("global");
  const locale = useLocale();
  const dir = getLangDir(locale);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title_ar: "",
      title_en: "",
      description_ar: "",
      description_en: "",
      meta_description_ar: "",
      meta_description_en: "",
      categoryId: "",
      is_active: undefined,
      external_url: "",
      images: undefined,
      thumbnail: undefined,
    },
  });
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [uploadedThumbnail, setUploadedThumbnail] = useState<File[]>([]);
  const [createdProduct, setCreatedProducts] = useState({
    show: false,
    id: null,
  });
  const handleImagesChange = (files: File[]) => {
    setUploadedImages(files);
  };
  const handleThumbnailChange = (files: File[]) => {
    setUploadedThumbnail(files);
  };
  const country = useCountry();
  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    formData.images = uploadedImages;
    formData.thumbnail = uploadedThumbnail;
    console.log(formData);
    const payload = { ...formData };
    await createProduct({
      payload,
      params: { country },
    })
      .unwrap()
      .then((res) => {
        toast({
          description: res_status("created_successfully"),
        });
        form.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col">
      <div className="bg-transparent p-4 drop-shadow-lg rounded-lg">
        <div className="mb-4">
          <h2 className=" text-2xl text-black font-semibold">
            {t("create_new_product")}
          </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2 ">
            <div className="grid grid-cols-4 gap-2">
              <Tabs
                className=" !shadow-none !drop-shadow-none col-span-3 bg-white rounded-md py-4 px-2"
                defaultValue={locale === "ar" ? "ar" : "en"}
                dir={dir}
              >
                <TabsList className="flex gap-2  !shadow-none !drop-shadow-none bg-transparent">
                  <TabsTrigger value="ar" className="w-full shadow-none">
                    {global("ar")}
                  </TabsTrigger>
                  <TabsTrigger value="en" className="w-full shadow-none">
                    {global("en")}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="ar">
                  <FormField
                    control={form.control}
                    name="title_ar"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          {global("in_ar", {
                            name: t("title"),
                          })}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className=" !w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description_ar"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          {global("in_ar", {
                            name: t("description"),
                          })}
                        </FormLabel>
                        <FormControl>
                          <RichTextEditor {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="meta_description_ar"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          {global("in_ar", {
                            name: t("meta_description"),
                          })}
                        </FormLabel>
                        <FormControl>
                          <RichTextEditor {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="en">
                  <FormField
                    control={form.control}
                    name="title_en"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          {global("in_en", {
                            name: t("title"),
                          })}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className=" !w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description_en"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          {global("in_en", {
                            name: t("description"),
                          })}
                        </FormLabel>
                        <FormControl>
                          <RichTextEditor {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="meta_description_en"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          {global("in_en", {
                            name: t("meta_description"),
                          })}
                        </FormLabel>
                        <FormControl>
                          <RichTextEditor {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>
              <div className="flex items-center justify-start flex-col  gap-4 col-span-1 w-full bg-white py-4 px-2 rounded-md">
         
               <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="w-full">
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
                          {data?.data?.map((cat) => {
                            return (
                              <SelectItem
                                key={cat.id}
                                value={cat.id.toString()}
                              >
                                {cat[`name_${locale}`] as string}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

        
             
                <FormField
                  name="is_active"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{status("status")}</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(value === "true")
                        }
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={global("choose")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent dir={dir}>
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
                  control={form.control}
                  name="thumbnail"
                  render={() => (
                    <FormItem className=" w-full">
                      <FormLabel>{t("thumbnail")}</FormLabel>
                      <FormControl>
                        <ImageUploader
                          imageContainerClass="grid-cols-1"
                          className="!max-w-full"
                          onFileChange={handleThumbnailChange}
                          multiple={false}
                          max={1}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="images"
                  render={() => (
                    <FormItem className=" w-full">
                      <FormLabel>{t("product_images")}</FormLabel>
                      <FormControl>
                        <ImageUploader
                          className="!max-w-full "
                          imageContainerClass="grid-cols-2"
                          onFileChange={handleImagesChange}
                          multiple={true}
                          max={10}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" isLoading={isLoading}>
              {t("create")}
            </Button>
            {/* <Button variant="outline">
              <Link href={`/products/${createdProduct.id}`} target="_">
                {t("show_product")}
              </Link>
            </Button> */}
          </form>
        </Form>
      </div>
    </div>
  );
}
