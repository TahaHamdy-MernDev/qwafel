"use client";
import React from "react";
import Typography from "@/components/reusable/typography";
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
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateColorMutation } from "@/redux/services/products/colors-api";
import { useToast } from "@/hooks/use-toast";
const createSize = z.object({
  name: z.string().min(1).max(20),
});
type formInputs = z.infer<typeof createSize>;

const Header: React.FC = () => {
  const global = useTranslations("global");
  const res_status = useTranslations("res_status");
  const t = useTranslations("Pages.Colors");
  const { toast } = useToast();
  const [createColor, { isLoading }] = useCreateColorMutation();
  const createForm = useForm<formInputs>({
    resolver: zodResolver(createSize),
    mode: "onChange",
    defaultValues: { name: "" },
  });
  const onSubmitCreate = async (data: formInputs) => {
    console.log("Form submitted with data:", data);
    await createColor(data)
      .unwrap()
      .then(() => {
        toast({
          description: res_status("created_successfully"),
        });
        createForm.reset();
      });
  };
  return (
    <div className="bg-white shadow-lg rounded-lg px-4 py-2 flex items-center justify-between">
      <Typography as={"h1"} variant={"title"}>
        {t("Colors")}
      </Typography>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"flat_main"}>{global("add_new")}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("add_new_color")}</DialogTitle>
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
              <DialogFooter>
                <Button type="submit" isLoading={isLoading}>{global("create")}</Button>
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
    </div>
  );
};

export default Header;
