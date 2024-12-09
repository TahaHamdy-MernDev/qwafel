"use client";
import { DatePickerWithRange } from "@/components/date-picker-range";
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
  const { handleSubmit, control, reset, register } = useForm();
  const status = [
    { label: t("status.active"), value: "active" },
    { label: t("status.inactive"), value: "inactive" },
  ];
  // const onSubmit = (data ) => {
  //   console.log(data);
  // };
  return (
    <Search title={t("all_products")}>
      <form
      //  onSubmit={handleSubmit(onSubmit)}
       >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <Input type="text" placeholder={t("code")} {...register("code")} />
          <Select
            options={status}
            placeholder={t("status.status")}
            control={control}
            {...register("status")}
          />
          <Select
            options={status}
            placeholder={t("category")}
            control={control}
            name="category"
            //
          />
          <Input
            type="text"
            placeholder={t("user_code")}
            {...register("user_code")}
          />
          <Input
            type="text"
            placeholder={t("product_name")}
            {...register("product_name")}
          />
          <DatePickerWithRange
            placeholder={t("date")}
            name="date"
            control={control}
          />
          <Input
            type="text"
            placeholder={t("seller_commission")}
            {...register("seller_commission")}
          />
          <Input
            type="text"
            placeholder={t("system_commission")}
            {...register("system_commission")}
          />
          <Input
            type="text"
            placeholder={t("product_sku")}
            {...register("product_sku")}
          />
          <div className=" w-full flex max-w-lg items-start gap-2">
            <Button type="submit" className=" w-full">
              {tSearch("search")}
            </Button>
            <Button
              variant={"outline"}
              onClick={() => reset()}
              className=" w-full"
            >
              {tSearch("reset")}
            </Button>
          </div>
        </div>
      </form>
    </Search>
  );
};

export default AllSearch;
