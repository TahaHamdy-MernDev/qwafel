"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React, { useEffect, useMemo, useState } from "react";

import VariantForm from "./variant-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2Icon, Trash2 } from "lucide-react";
import { VariantsAccordionProps } from "./page";
interface Variant {
  id?: number | string;
  price: number;
  quantity: number;
  warehouseId?: number;
  warehouse?: string;
  sizeId?: number;
  size?: string;
  colorId?: number;
  color?: string;
}


const VariantsAccordion: React.FC<VariantsAccordionProps> = ({
  addVariant,
  variants,
  deleteVariant,
  global,
  t,
  tVar,
}) => {
  const autoOpen = variants?.length > 0 ? ["item-1"] : [];
  return (
    <Accordion type="multiple" value={autoOpen}>
      <AccordionItem value="item-1" className="bg-white p-2 rounded-md">
        <div className="flex items-center justify-between gap-2">
          <AccordionTrigger
            icon={false}
            headerClassName="w-full [&_button:first-child:hover]:!no-underline  [&_button:first-child]:py-2 [&_button:first-child]:text-xl"
          >
            {t("variants", {
              count: variants?.length,
            })}
          </AccordionTrigger>
          <VariantForm
            onSubmit={(newVariant) => {
              addVariant({
                ...newVariant,
                warehouseId: newVariant.warehouseId
                  ? Number(newVariant.warehouseId)
                  : undefined,
                sizeId: newVariant.sizeId
                  ? Number(newVariant.sizeId)
                  : undefined,
                colorId: newVariant.colorId
                  ? Number(newVariant.colorId)
                  : undefined,
                id: ""
              });
            }}
            type={"create"}
          />
        </div>

        <AccordionContent>
          {variants?.map((variant, index) => (
            <div
              key={variant.id || `variant-${index}`}
              className="flex items-end justify-between gap-2"
            >
              <div className="w-full flex items-center justify-start gap-2">
                <FormField
                  name="variant_price"
                  disabled
                  defaultValue={variant.price}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{tVar("price")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="variant_quantity"
                  disabled
                  defaultValue={variant.quantity}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{tVar("quantity")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="variant_warehouseId"
                  disabled
                  defaultValue={variant.warehouseId ?? global("not_available")}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{tVar("warehouse")}</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={
                            variant.warehouseId?.toString() ??
                            global("not_available")
                          }
                          disabled
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={global("choose")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value={variant.warehouseId?.toString() ?? ""}
                            >
                              {variant.warehouse ?? global("not_available")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="variant_sizeId"
                  disabled
                  defaultValue={variant.sizeId ?? global("not_available")}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{tVar("size")}</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={
                            variant.sizeId?.toString() ??
                            global("not_available")
                          }
                          disabled
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={global("choose")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value={variant.sizeId?.toString() ?? ""}
                            >
                              {variant.size ?? global("not_available")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="variant_colorId"
                  disabled
                  defaultValue={variant.colorId ?? global("not_available")}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{tVar("color")}</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={
                            variant.colorId?.toString() ??
                            global("not_available")
                          }
                          disabled
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={global("choose")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value={variant.colorId?.toString() ?? ""}
                            >
                              {variant.color ?? global("not_available")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-end justify-center gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  className=""
                  onClick={() => deleteVariant(index)}
                >
                  <Trash2 className="text-white" />
                  {global("delete")}
                </Button>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default VariantsAccordion;
