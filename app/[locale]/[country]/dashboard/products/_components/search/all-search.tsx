"use client";
import Search from "@/components/search";
import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";

const AllSearch: React.FC = () => {
  const t = useTranslations("Products");
  const tSearch = useTranslations("search");
  const { handleSubmit, control } = useForm();
  const status = [
    { label: t("status.active"), value: "active" },
    { label: t("status.inactive"), value: "inactive" },
  ];
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Search title={t("all_products")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <Input type="text" name="code" placeholder={t("code")} />
          <Select
            options={status}
            placeholder={t("status.status")}
            name="status"
            control={control}
          />
          <Select
            options={status}
            placeholder={t("category")}
            name="category"
            control={control}
          />
          <Input type="text" name="code" placeholder={t("user_code")} />
          {/* <Input type="text" name="code" placeholder={t("status.status")} /> */}
          <Input type="text" name="code" placeholder={t("date")} />
          <Input type="text" name="code" placeholder={t("product_name")} />
          <Input type="text" name="code" placeholder={t("seller_commission")} />
          <Input type="text" name="code" placeholder={t("system_commission")} />
          <Input type="text" name="code" placeholder={t("product_sku")} />
          <div className=" w-full flex max-w-lg items-start gap-2">
            <Button type="submit" className=" w-full">
              {tSearch("search")}
            </Button>
            <Button variant={"outline"} type="reset" className=" w-full">
              {tSearch("reset")}
            </Button>
          </div>
        </div>
      </form>
    </Search>
  );
};

export default AllSearch;
