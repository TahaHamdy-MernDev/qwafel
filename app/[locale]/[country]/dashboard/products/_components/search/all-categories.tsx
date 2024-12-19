"use client";
import Search from "@/components/search";
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
import { getSearchCategorySchema } from "@/schemas/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getLangDir } from "rtl-detect";
import z from "zod";
import CreateCategoryForm from "../../categories/all/actions/create";

type FormInputs = z.infer<ReturnType<typeof getSearchCategorySchema>>;

const AllCategoriesSearch: React.FC = () => {
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
  
  const onSubmitSearch = (formData: FormInputs) => {
    console.log("Search Data:", formData);
  };

 
  return (
    <Search
      title={t("title")}
      additionalContent={
       <CreateCategoryForm/>
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
